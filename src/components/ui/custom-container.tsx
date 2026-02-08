import React from "react";
import {DotPattern} from "@components/ui/dot-pattern";
import {cn} from "@/lib/utils";
import {Card} from "@components/ui/card";
import {ShineBorder} from "@components/ui/shine-border";

export interface MainPageContainerProps {
    children: React.ReactNode;
}

export const MainPageContainer = ({children}: MainPageContainerProps) => {
    return <div className="md:min-h-full p-5 w-full flex flex-col gap-5 px-5">
        {children}
    </div>
}

export interface MultiSectionLayoutProps {
    sidebar: React.ReactNode;
    children: React.ReactNode;
}

export const MultiSectionLayout = ({sidebar, children}: MultiSectionLayoutProps) => {

    return <main className="max-w-lvw min-h-lvh flex flex-col flex-3 md:flex-row-reverse">
        <section className="md:min-w-fit md:justify-items-center md:flex-1/3"> {sidebar} </section>
        <section className="md:min-w-fit md:flex-2/3 flex md:justify-items-center"> {children} </section>
    </main>
}

export interface SidebarContainerProps {
    children: React.ReactNode;
}

export const SidebarContainer = ({children}: SidebarContainerProps) => {
    return <div className="md:min-h-full w-full relative overflow-hidden flex flex-col gap-10 px-5">
        <DotPattern className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        )}/>
        {children}
    </div>
}

export interface SectionContainerProps {
    children?: React.ReactNode;
    title?: string;
}

export const SectionContainer = ({title, children}: SectionContainerProps) => {
  return <Card className="w-full relative gap-2 p-2 overflow-hidden">
      <ShineBorder  shineColor={["#A78BFA", "#C4B5FD", "#A78BFA"]} />
      <h1>{title}</h1>
      {children}
  </Card>
}