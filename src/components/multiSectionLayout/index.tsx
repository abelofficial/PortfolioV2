import React from "react";

export interface MultiSectionLayoutProps {
    sidebar: React.ReactNode;
    children: React.ReactNode;
}

const MultiSectionLayout = ({sidebar, children}: MultiSectionLayoutProps) => {

    return <main className="max-w-lvw min-h-lvh flex flex-col flex-3 md:flex-row-reverse ">
        <section className="md:min-w-fit md:justify-items-center md:flex-1/3 px-2"> {sidebar} </section>
        <section className="md:min-w-fit md:flex-2/3 flex md:justify-items-center"> {children} </section>
    </main>
}

export default MultiSectionLayout;