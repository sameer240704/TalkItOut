import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from 'cloudinary';
import streamifier from "streamifier";

export const getUserPanelDetails = async (req, res, next) => {
    const { userId } = req.query;

    try {
        if (!userId)
            return res.status(400).json({ message: "User not found" });

        const existingUser = await User.findById(userId);

        if (!existingUser)
            return res.status(400).json({ message: "User not found" });

        const userDetails = {
            name: existingUser.name,
            avatarImage: existingUser.avatarImage,
            bioData: existingUser.bioData,
        }

        return res.status(200).json({ message: "Successfully fetched user details", userDetails: userDetails });

    } catch (error) {
        console.error("Error in getUserPanelDetails: ", error.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const uploadDocument = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        transformation: [
                            {
                                quality: "auto",
                                fetch_format: "auto"
                            }
                        ],
                        folder: 'messages'
                    },
                    (error, result) => {
                        if (error) {
                            console.error('Cloudinary upload error:', error);
                            reject(error);
                        } else {
                            console.log('Upload successful:', result);
                            resolve(result);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
            });
        };

        const result = await streamUpload(req);

        if (result && result.secure_url) {
            return res.status(200).json({
                message: 'Document uploaded successfully',
                documentUrl: result.secure_url,
            });
        } else {
            throw new Error('Upload result does not contain secure_url');
        }
    } catch (error) {
        console.error('Error during document upload:', error);
        return res.status(500).json({ error: 'Error uploading document' });
    }
};

export const sendMessage = async (req, res, next) => {
    try {
        const { recipientId, senderId, type, content, fileUrl, fileName } = req.body;
        console.log(req.body);

        if (type === "text" && !content) {
            return res.status(400).json({ error: "Text content is required for a text message" });
        }
        if ((type === "image" || type === "document") && (!fileUrl || !fileName)) {
            return res.status(400).json({ error: "File URL and file name are required for image/document message" });
        }

        const newMessage = new Message({
            sender: senderId,
            receiver: recipientId,
            type,
            content: type === "text" ? content : undefined,
            fileUrl: type !== "text" ? fileUrl : undefined,
            fileName: type === "document" ? fileName : undefined,
        });

        const savedMessage = await newMessage.save();

        res.status(200).json(savedMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Failed to send message" });
        next();
    }
};

export const getAllMessages = async (req, res, next) => {
    const { senderId, receiverId } = req.query;

    try {
        if (!senderId || !receiverId) {
            return res.status(400).json({ error: "Users don't exist" });
        }

        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId },
            ],
        });

        const formattedMessages = messages.map((msg) => {
            return {
                type: msg.type,
                content: msg.content,
                fileUrl: msg.fileUrl,
                fileName: msg.fileName,
                timestamp: msg.timestamp,
                senderId: msg.sender.toString(),
                receiverId: msg.receiver.toString(),
            };
        });

        console.log(receiverId, ": ", formattedMessages);

        res.status(200).json({ message: "Messages fetched successfully", messages: formattedMessages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Error fetching messages" });
    }
};