import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import siteConfig from "@App/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: `${siteConfig.title} | ${siteConfig.description}`,
    description: siteConfig.description,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="dark">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
