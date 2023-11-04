"use client";
import FormUser from "@App/components/FormUser";
import siteConfig from "@App/config/site";
import { useAuth } from "@App/contexts/auth/authContext";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function LoginPage() {
    const authContext = useAuth();

    if (authContext.token && authContext.user) {
        return redirect("/");
    }

    return (
        <main>
            <header className="mb-4">
                <h2 className="text-5xl first-letter:text-primary first-letter:text-7xl">
                    {siteConfig.title}
                </h2>
                <h1 className="text-2xl text-right mr-4">Login</h1>
            </header>
            <FormUser action="login" submitBtnTxt="Login" />
            <p className="mt-4 text-sm text-right pr-7">
                Não tem uma conta?{" "}
                <Link className="hover:text-primary-focus" href="/register">
                    Crie uma.
                </Link>
            </p>
        </main>
    );
}
