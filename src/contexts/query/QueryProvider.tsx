'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const QueryProvider = ({children}: {children: ReactNode}) => (
    <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
)