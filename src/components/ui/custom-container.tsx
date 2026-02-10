import React from "react";
import {DotPattern} from "@components/ui/dot-pattern";
import {cn} from "@/lib/utils";
import {Card} from "@components/ui/card";
import {ShineBorder} from "@components/ui/shine-border";

export interface MainPageContainerProps {
    children: React.ReactNode;
}

export const MainPageContainer = ({children}: MainPageContainerProps) => {
    return <div className="p-4 md:p-5 w-full">
        <div className="gap-5 md:gap-10 flex flex-col">
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
        <main className="flex flex-col xl:flex-row-reverse h-screen w-screen xl:overflow-hidden">
            <section className="w-full xl:w-1/3 h-fit xl:h-full xl:overflow-hidden">
                {sidebar}
            </section>
            <section className="flex-1 h-full xl:overflow-y-auto xl:custom-scrollbar bg-secondary">
                {children}
            </section>
        </main>
    )
}

export interface SidebarContainerProps {
    children: React.ReactNode;
}

export const SidebarContainer = ({children}: SidebarContainerProps) => {
    return <div className="md:min-h-full w-full relative flex justify-center">
        <DotPattern className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}/>
        <div className="flex flex-col items-center gap-10 px-5 max-w-4xl">
            {children}
        </div>
    </div>
}

export interface SectionContainerProps {
    children?: React.ReactNode;
    title?: string;
    disableShine?: boolean;
}

export const SectionContainer = ({title, disableShine, children}: SectionContainerProps) => {
    return <Card className="w-full relative gap-10 p-5 overflow-hidden">
        {disableShine || <ShineBorder shineColor={["#A78BFA", "#C4B5FD", "#A78BFA"]}/>}
        {title && <h2 className="text-md font-bold">{title}</h2>}
        {children}
    </Card>
}