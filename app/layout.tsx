import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/src/widgets/NavBar/ui/NavBar";
import AuthProvider from "@/src/app/auth/AuthProvider";
import ToastProvider from "@/src/shared/ui/Toasts/ToastProvider";
import Footer from "@/src/widgets/Footer/ui/Footer";
import getThreadsWithPlayer from "@/src/entities/Thread/api/getThreadsWithPlayer";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/src/app/auth/model/nextAuthOptions";
import { IThread, IThreadExpandable } from "@/src/entities/Thread/model/types";
import Sidebar from "@/src/widgets/Sidebar/Sidebar";
const inter = Inter({ subsets: ["cyrillic"], weight: "400" });

export const metadata: Metadata = {
  title: "Pixel (beta)",
  description: "Лучший ванильный сервер",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);

  const userThreads: IThread[] | undefined =
    session &&
    session.user.player &&
    (
      await getThreadsWithPlayer(session.user.player, [
        IThreadExpandable.RECENT_MESSAGE,
        IThreadExpandable.CREATOR,
      ])
    ).slice(0, 3);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider>
            <NavBar userThreads={userThreads} />
            <Sidebar userThreads={userThreads} />
            {children}
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export const revalidate = 0;
