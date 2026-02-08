"use client";
import Link from "next/link";
import {Dock, DockIcon} from "@components/ui/dock";
import {Separator} from "@components/ui/separator";
import {Birdhouse, BookOpenIcon, LucideHistory, GlobeIcon} from "lucide-react";
import {AnimatedThemeToggler} from "@components/ui/animated-theme-toggler";

const Toolbar = () => {
    return (
        <Dock direction="middle">
            <DockIcon>
                <Link href="/"> <Birdhouse className="size-5"/></Link>
            </DockIcon>
            <DockIcon>
                <Link href="/timeline"><LucideHistory className="size-5"/></Link>
            </DockIcon>
            <DockIcon>
                <Link href="/blogs"><BookOpenIcon className="size-5"/></Link>
            </DockIcon>
            <Separator orientation="vertical" className="h-full" />
            <DockIcon>
                <GlobeIcon className="size-5"/>
            </DockIcon>
            <DockIcon>
                <AnimatedThemeToggler className="size-5"/>
            </DockIcon>
        </Dock>
    )
}

export default Toolbar;