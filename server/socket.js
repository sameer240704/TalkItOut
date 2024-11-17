import { Server as SocketServer } from "socket.io";
import Message from "./models/message.model.js";

export const onlineUsers = new Map();

export const setupSocket = (server) => {
    const io = new SocketServer(server, {
        cors: {
            origin: process.env.WEB_URL || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    const disconnect = (socket) => {
        console.log(`Client disconnected: ${socket.id}`);
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                io.emit("user_status", { userId, status: "offline" });
            }
        }
    };

    const sendMessage = async (messageData) => {
        try {
            const { recipientId, senderId, type, content, fileUrl, fileName } = messageData;

            if (type === "text" && !content) {
                console.error("Text content is required for a text message");
                return;
            }
            if ((type === "image" || type === "document") && (!fileUrl || !fileName)) {
                console.error(`File URL and file name are required for ${type}`);
                return;
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

            const messageDataToSend = await Message.findById(savedMessage._id)
                .populate("sender", "id name email avatarImage bioData")
                .populate("receiver", "id name email avatarImage bioData");

            const recipientSocketId = onlineUsers.get(recipientId);
            const senderSocketId = onlineUsers.get(senderId);

            console.log(recipientSocketId, senderSocketId);

            if (recipientSocketId) {
                io.to(recipientSocketId).emit("receiveMessage", messageDataToSend);
            }

            if (senderSocketId) {
                io.to(senderSocketId).emit("messageSent", messageDataToSend);
            }

        } catch (error) {
            console.error("Error in sendMessage:", error.message);
        }
    };

    io.on("connection", (socket) => {
        console.log(`New connection: ${socket.id}`);
        const userId = socket.handshake.query.userId;

        if (userId) {
            onlineUsers.set(userId, socket.id);
            onlineUsers.forEach((_, onlineUserId) => {
                socket.emit("user_status", { userId: onlineUserId, status: "online" });
            });

            io.emit("user_status", { userId, status: "online" });

            socket.emit("user_status", { userId, status: "online" });
        }

        socket.on("sendMessage", sendMessage);
        socket.on("typing", (data) => {
            console.log(data);
            socket.to(data.receiverId).emit("typing", { senderId: data.senderId });
        });
        socket.on("stopTyping", (data) => {
            socket.to(data.receiverId).emit("stopTyping");
        });
        socket.on("disconnect", () => disconnect(socket));
    });
};
