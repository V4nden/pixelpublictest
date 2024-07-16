import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/src/shared/ui/NavBar/NavBar";
import { SessionProvider } from "next-auth/react";
import SSRSessionProvider from "@/src/shared/SSRSessionProvider";
import { ToastContainer } from "react-toastify";
import ToastProvider from "@/src/shared/ui/Toasts/ToastProvider";
import Footer from "@/src/shared/ui/Footer/Footer";

const inter = Roboto({ subsets: ["cyrillic"], weight: "300" });

export const metadata: Metadata = {
  title: "Pixel 1.21 (beta)",
  description: "Лучший ванильный сервер",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <SSRSessionProvider>
          <ToastProvider>
            <NavBar />
            {children}
            <Footer />
          </ToastProvider>
        </SSRSessionProvider>
      </body>
    </html>
  );
}
