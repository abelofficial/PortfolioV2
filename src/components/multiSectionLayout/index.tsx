import React from "react";

export interface MultiSectionLayoutProps {
    sidebar: React.ReactNode;
    children: React.ReactNode;
}
const MultiSectionLayout = ({sidebar, children}: MultiSectionLayoutProps) => {
  
    return <main className="min-w-screen min-h-lvh flex flex-col md:flex-row-reverse">
        <section className="md:flex-1/3"> {sidebar} </section>
        <section className="md:flex-2/3"> {children} </section>
    </main>
}

export default MultiSectionLayout;