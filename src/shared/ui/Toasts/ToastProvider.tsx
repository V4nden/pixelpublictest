"use client";

import "./ToastStyle.css";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer theme="dark" position="bottom-left" autoClose={3000} />
    </>
  );
}
