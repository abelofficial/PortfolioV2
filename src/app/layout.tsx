import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Toolbar from "@components/toolbar";
import {MultiSectionLayout, SidebarContainer} from "@components/ui/custom-container";
import ChatAI from "@components/chatAI";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/next";
import {ThemeProvider} from "next-themes";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Abel Sintaro | Software Engineer",
    description: "A personal website showcasing the projects, experience, and " +
        "skills of Abel Sintaro, a software engineer specializing in web development and AI.",
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // This is the key line
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <MultiSectionLayout
                    sidebar={
                        <SidebarContainer>
                            <Toolbar/>
                            <ChatAI/>
                        </SidebarContainer>}>
                    {children}
                </MultiSectionLayout>
            </ThemeProvider>
            <SpeedInsights/>
            <Analytics/>
        </body>
        </html>
    );
}
