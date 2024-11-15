import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    const { userId } = req.query;

    try {
        if (!userId) {
            return res.status(400).json({ message: "Invalid user" })
        }
        const currentUser = await User.findById(userId);

        if (!currentUser) {
            return res.status(400).json({ message: "You are not registered" })
        }

        const friendsList = currentUser?.friends || [];

        const users = await User.find({ _id: { $nin: [userId, ...friendsList] } }).select("name bioData avatarImage").sort({ name: 1 });

        return res.status(200).json({
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const addFriend = async (req, res, next) => {
    const { userId, myUserId } = req.body;

    try {
        if (!userId) {
            return res.status(400).json({ message: "Invalid user" });
        }

        const existingUser = await User.findById(userId);
        const currentUser = await User.findById(myUserId);

        if (!existingUser || !currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (
            existingUser.friends.includes(myUserId) ||
            currentUser.friends.includes(userId)
        ) {
            return res.status(400).json({ message: "Users are already friends" });
        }

        existingUser.friends.push(myUserId);
        currentUser.friends.push(userId);

        await existingUser.save();
        await currentUser.save();

        return res.status(200).json({ message: `${existingUser.name} is now your TalkItOut Buddy` });
    } catch (error) {
        console.error("Error in addFriend: ", error);
        return res.status(400).json({ message: "Internal Server Error" });
    }
}

export const getAllFriends = async (req, res, next) => {
    const { userId } = req.query;

    try {
        if (!userId) {
            return res.status(400).json({ message: "Invalid user" });
        }

        const existingUser = await User.findById(userId).select("friends");

        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const friendsList = existingUser.friends;

        const friendsData = await Promise.all(
            friendsList.map(friendId =>
                User.findById(friendId).select("name avatarImage")
            )
        );

        return res.status(200).json({ friends: friendsData });
    } catch (error) {
        console.error("Error in getAllFriends: ", error);
        return res.status(400).json({ message: "Internal server error" })
    }
}