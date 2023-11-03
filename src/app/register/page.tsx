import FormRegister from "@App/components/FormRegister";
import siteConfig from "@App/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Registro | ${siteConfig.title}`,
    description: "Pagina para criar contas.",
};

export default function RegisterPage() {
    return (
        <main>
            <header className="mb-4">
                <h2 className="text-5xl first-letter:text-primary first-letter:text-7xl">
                    {siteConfig.title}
                </h2>
                <h1 className="text-2xl text-right mr-4">Registro</h1>
            </header>
            <FormRegister />
        </main>
    );
}
