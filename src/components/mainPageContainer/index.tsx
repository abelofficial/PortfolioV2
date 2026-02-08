import React from "react";

export interface MainPageContainerProps {
    children: React.ReactNode;
}

const MainPageContainer = ({children}: MainPageContainerProps) => {
    return <div className="md:min-h-full p-5 w-full">
        {children}
    </div>
}

export default MainPageContainer;