import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import "@/index.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Career Compass",
    description: "AI-Powered Career Guidance for Indian Students",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
