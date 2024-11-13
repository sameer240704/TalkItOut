import axios from "axios";
import { VERIFY_ROUTE } from "../utils/constants";

export const useVerifyUser = () => {
    const verifyUser = async () => {
        try {
            const userId = localStorage.getItem("user");
            if (!userId) {
                return { success: false };
            }

            const response = await axios.post(
                VERIFY_ROUTE,
                { userId },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.status === 200) {
                return { success: true };
            } else {
                return { success: false, message: "Login failed. Please try again." };
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || "An error occurred. Please try again.";
            return { success: false, message: errorMessage };
        }
    };

    return { verifyUser };
};