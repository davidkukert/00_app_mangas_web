"use client";

import { FormUserData } from "@App/components/FormUser";
import { ReactNode, useState, useEffect } from "react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!token) setToken(localStorage.getItem("appToken"));
        async function getUser() {
            if (!user && token) {
                const response = await fetch(
                    "http://localhost:3333/auth/profile",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.ok) {
                    setUser(await response.json());
                }
            }
        }
        getUser();
    }, [token, user]);

    const login = async (data: FormUserData) => {
        const response = await fetch("http://localhost:3333/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const { accessToken } = await response.json();
            setToken(accessToken);
            localStorage.setItem("appToken", accessToken);
            return {
                message: "Login efetuado com sucesso!",
                type: "success",
            } as FormUserSubmitResult;
        } else {
            const { message } = await response.json();
            return { message, type: "error" } as FormUserSubmitResult;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("appToken");
    };

    const value = {
        user,
        login,
        logout,
        token,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
