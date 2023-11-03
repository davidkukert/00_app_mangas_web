"use client";

import clsx from "clsx";
import * as React from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaKey } from "react-icons/fa6";

type FormUserData = {
    username: string;
    password: string;
};

export interface FormUserProps {
    submitBtnTxt?: string;
    action?: "create" | "login";
}

export default function FormUser({
    action = "create",
    submitBtnTxt = "Criar conta",
}: FormUserProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormUserData>();
    const onSubmit = handleSubmit((data) => {
        switch (action) {
            case "create":
                console.log(action, data);
                break;
            case "login":
                console.log(action, data);
                break;
        }
    });

    return (
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
                            errors.username ? "btn-error" : "btn-ghost"
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
                            errors.password ? "btn-error" : "btn-ghost"
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
    );
}
