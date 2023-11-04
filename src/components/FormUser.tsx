"use client";

import { useAuth } from "@App/contexts/auth/authContext";
import clsx from "clsx";
import * as React from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaKey, FaCheck, FaRegCircleXmark } from "react-icons/fa6";

export type FormUserData = {
    username: string;
    password: string;
};

interface FormUserSubmitResult {
    message: string;
    type: "error" | "success";
}

export interface FormUserProps {
    submitBtnTxt?: string;
    action?: "create" | "login";
}

export default function FormUser({
    action = "create",
    submitBtnTxt = "Criar conta",
}: FormUserProps) {
    const [result, setResult] = React.useState<FormUserSubmitResult | null>(
        null
    );
    const authContext = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormUserData>();
    const onSubmit = handleSubmit((data) => {
        switch (action) {
            case "create":
                createUserAction(data);
                break;
            case "login":
                loginUserAction(data);
                break;
        }
    });

    const createUserAction = async (data: FormUserData) => {
        const response = await fetch("http://localhost:3333/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            setResult({
                message: "Conta criada com sucesso!",
                type: "success",
            });
        } else {
            const { message } = await response.json();
            setResult({ message, type: "error" });
        }
    };

    const loginUserAction = async (data: FormUserData) => {
        setResult(await authContext.login(data));
    };

    return (
        <>
            <form onSubmit={onSubmit} className="w-80 card bg-base-200">
                <div className="card-body">
                    <div
                        className={clsx(
                            "join border-2 focus-within:border-neutral-900",
                            errors.username ? "border-error" : "border-neutral"
                        )}
                    >
                        <label
                            htmlFor="username"
                            className={clsx(
                                "btn join-item",
                                errors.username ? "btn-error" : "btn-neutral"
                            )}
                        >
                            <FaUser />
                        </label>
                        <input
                            id="username"
                            className={clsx(
                                "input join-item w-[204px] focus:outline-none",
                                errors.username && "input-error"
                            )}
                            {...register("username", { required: true })}
                            placeholder="username"
                        />
                    </div>
                    <div
                        className={clsx(
                            "join border-2 focus-within:border-neutral-900",
                            errors.password ? "border-error" : "border-neutral"
                        )}
                    >
                        <label
                            htmlFor="password"
                            className={clsx(
                                "btn join-item",
                                errors.password ? "btn-error" : "btn-neutral"
                            )}
                        >
                            <FaKey />
                        </label>
                        <input
                            id="password"
                            className={clsx(
                                "input join-item w-[204px] focus:outline-none",
                                errors.password && "input-error"
                            )}
                            {...register("password", { required: true })}
                            placeholder="password"
                            type="password"
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        {submitBtnTxt}
                    </button>
                </div>
            </form>
            {isSubmitSuccessful && result && (
                <div
                    className={clsx(
                        "alert mt-4 text-sm cursor-pointer",
                        result.type == "error" ? "alert-error" : "alert-success"
                    )}
                    onClick={() => setResult(null)}
                >
                    {result.type == "success" ? (
                        <FaCheck />
                    ) : (
                        <FaRegCircleXmark />
                    )}
                    <span>{result.message}</span>
                </div>
            )}
        </>
    );
}
