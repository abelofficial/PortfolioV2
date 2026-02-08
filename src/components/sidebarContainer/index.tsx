import React from "react";
import {DotPattern} from "@components/ui/dot-pattern";
import {cn} from "@/lib/utils";

export interface SidebarContainerProps {
    children: React.ReactNode;
}

const SidebarContainer = ({children}: SidebarContainerProps) => {
    return <div className="md:min-h-full relative overflow-hidden flex flex-col gap-1">
        <DotPattern className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        )}/>
        {children}
    </div>
}

export default SidebarContainer;