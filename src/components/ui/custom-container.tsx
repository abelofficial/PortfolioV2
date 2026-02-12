import React from "react";
import {DotPattern} from "@components/ui/dot-pattern";
import {cn} from "@/lib/utils";
import {Card} from "@components/ui/card";
import {ShineBorder} from "@components/ui/shine-border";

export interface MainPageContainerProps {
    children: React.ReactNode;
}

export interface SidebarContainerProps {
    children: React.ReactNode;
}

export const SidebarContainer = ({children}: SidebarContainerProps) => {
    return <div className="md:min-h-full w-full relative flex justify-center">
        <DotPattern className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}/>
        <div className="flex flex-col items-center gap-5 px-5 pb-5 max-w-4xl  w-full">
            {children}
        </div>
    </div>
}

export const MainPageContainer = ({children}: MainPageContainerProps) => {
    return <div className="p-4 md:p-5 w-full">
        <div className="gap-4 flex flex-col">
            {children}
        </div>
    </div>
}

export interface MultiSectionLayoutProps {
    sidebar: React.ReactNode;
    children: React.ReactNode;
}

export const MultiSectionLayout = ({sidebar, children}: MultiSectionLayoutProps) => {
    return (
        <main className="flex flex-col xl:flex-row-reverse h-screen w-screen">
            <section className="w-full xl:w-1/3 h-fit xl:h-full xl:overflow-hidden">
                {sidebar}
            </section>
            <section className="flex-1 h-fit xl:h-full xl:overflow-y-auto xl:custom-scrollbar bg-secondary">
                {children}
            </section>
        </main>
    )
}

export interface SectionContainerProps {
    children?: React.ReactNode;
    title?: string;
    disableShine?: boolean;
    disablePattern?: boolean;
    fullHeight?: boolean;
    headerAction: React.ReactNode
}

export const SectionContainer = ({title, disableShine, disablePattern, fullHeight, headerAction, children}: SectionContainerProps) => {
    return <Card className={`w-full p-4 py-4 overflow-hidden relative ${fullHeight ? "h-full" : ""}`}>
        {disablePattern || <DotPattern className={cn(
            "mask-[radial-gradient(300px_circle_at_top_right,white,transparent)]",
            "lg:mask-[radial-gradient(400px_circle_at_right,white,transparent)]"
        )}/>}
        {disableShine || <ShineBorder
            shineColor={["var(--color-primary-light)", "oklch(0.9 0.1 60)", "var(--color-primary-light)"]}/>}
        <div className="flex justify-between">
            {title && <h2 className="text-sm font-bold">{title}</h2>}
            {title && headerAction}
        </div>
        {children}
    </Card>
}