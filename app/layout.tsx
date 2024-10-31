import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/src/widgets/NavBar/ui/NavBar";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/src/app/auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import ToastProvider from "@/src/shared/ui/Toasts/ToastProvider";
import Footer from "@/src/widgets/Footer/ui/Footer";

const inter = Inter({ subsets: ["cyrillic"], weight: "400" });

export const metadata: Metadata = {
  title: "Pixel (beta)",
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
        <AuthProvider>
          <ToastProvider>
            <NavBar />
            {children}
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
