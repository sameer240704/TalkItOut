import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const register = async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${SERVER_URL}/server/auth/register`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );

            if (response.status === 200) {
                const user = response.data.userId;
                console.log(user);
                localStorage.setItem("user", user);
                dispatch({ type: "LOGIN", payload: user });
                setIsLoading(false);
                return { success: true };
            } else {
                setIsLoading(false);
                const errorMessage =
                    response.data.message || "Registration failed. Please try again.";
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (err) {
            setIsLoading(false);
            const errorMessage =
                err.response?.data?.message || "An error occurred. Please try again.";
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    };

    return { register, isLoading, error };
};