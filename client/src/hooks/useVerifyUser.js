import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useVerifyUser = () => {
    const verifyUser = async () => {
        try {
            const userId = localStorage.getItem("user");

            const response = await axios.post(
                `${SERVER_URL}/server/auth/verifyUser`,
                userId,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.status === 200) {
                const user = response.data;
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