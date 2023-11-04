import siteConfig from "@App/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Registro | ${siteConfig.title}`,
    description: "Pagina para criar contas.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            {children}
        </div>
    );
}
