"use client"

import { Toaster } from "react-hot-toast";

interface ClientLayoutProps {
    children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
    return (
        <>
        {children}
        <Toaster toastOptions={{duration: 3000}} />
        </>
    )
}

export default ClientLayout;