import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { REGISTER_ROUTE } from "../utils/constants";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const register = async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                REGISTER_ROUTE,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                const user = response.data.userId;
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