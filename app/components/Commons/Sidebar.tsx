import React from "react";

interface SidebarProps {
    children: React.ReactNode;
    className?: string;
}

const Sidebar = ({ children, className }: SidebarProps) => {
    return (
        <div className={`w-full lg:w-[300px] mb-10 lg:md-0${className?' '+className: ''}`}>
            {children}
        </div>
    );
}
 
export default Sidebar;