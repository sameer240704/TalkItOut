import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET, { expiresIn: maxAge })
}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const avatarImageFile = req.file;

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { name }]
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let avatarImageUrl = null;

        if (avatarImageFile) {
            try {
                const b64 = Buffer.from(avatarImageFile.buffer).toString("base64");
                const dataURI = "data:" + avatarImageFile.mimetype + ";base64," + b64;

                const cldRes = await cloudinary.uploader.upload(dataURI, {
                    resource_type: "auto",
                });

                avatarImageUrl = cldRes.secure_url;
            } catch (uploadError) {
                console.error("Error uploading primary image to Cloudinary:", uploadError);
                return res.status(500).json({ error: "Error uploading primary image" });
            }
        }

        const userData = {
            name,
            password: hashedPassword,
            email,
            avatarImage: avatarImageUrl,
        };

        const newUser = new User(userData);
        await newUser.save();

        res.cookie('token', createToken(email, newUser._id), {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1000 * 60 * 60 * 24,
        });

        res.status(200).json({ message: "User created successfully", userId: newUser._id });
    } catch (error) {
        console.error("Error in sign up:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { name }]
        });

        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.cookie('token', createToken(email, existingUser._id), {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 1000 * 60 * 60 * 24,
        });

        return res.status(200).json({
            message: "Login successful",
            userId: existingUser._id,
        });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Return details for current user
export const getCurrentUser = async (req, res, next) => {
    const { userId } = req.query;

    try {
        if (!userId)
            return res.status(400).json({ message: "User not found" });

        const existingUser = await User.findOne({ _id: userId });

        if (!existingUser) {
            return res.status(400).json({ message: "User not found" })
        }

        const userDetails = {
            userId: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            avatarImage: existingUser.avatarImage,
            bioData: existingUser.bioData,
            isOnline: existingUser.isOnline
        }

        return res.status(200).json({ message: "User details found", userDetails })
    } catch (error) {
        console.error("Error in getCurrentUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req, res, next) => {
    try {
        res.cookie('token', '', { maxAge: 1, httpOnly: false, secure: true, sameSite: "None" });
        return res.status(200).send("Logout successful");
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).send("Internal Server Error ");
    }
};

export const updateUserBioData = async (req, res) => {
    const { userId, bioData } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { bioData },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userDetails = {
            name: user.name,
            email: user.email,
            avatarImage: user.avatarImage,
            bioData: user.bioData
        }

        return res.status(200).json({
            message: "Bio updated successfully",
            userDetails
        });
    } catch (error) {
        console.error("Error updating bio:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

