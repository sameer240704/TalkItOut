import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${SERVER_URL}/server/auth/login`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );

            if (response.status === 200) {
                const user = response.data;
                console.log(user);
                localStorage.setItem("user", JSON.stringify(user));
                dispatch({ type: "LOGIN", payload: user });
                setIsLoading(false);
                return { success: true };
            } else {
                setIsLoading(false);
                setError("Login failed. Please try again.");
                return { success: false, message: "Login failed. Please try again." };
            }
        } catch (err) {
            setIsLoading(false);
            const errorMessage =
                err.response?.data?.message || "An error occurred. Please try again.";
            setError(errorMessage);
            return { success: false, message: errorMessage };
        }
    };

    return { login, isLoading, error };
};