import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
    title: "AI 금융 보안 서비스",
    description: "의심스러운 문자와 금융 연락을 AI로 분석하고 대응 방법을 안내합니다.",
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" data-scroll-behavior="smooth">
        <body>{children}</body>
        <Analytics />
        </html>
    );
}