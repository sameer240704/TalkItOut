import User from "../models/user.model.js";

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