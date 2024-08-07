import Heading from "./Heading";

interface SidebarHeadingProps {
    title: string;
}

const SidebarHeading = ({ title }: SidebarHeadingProps) => {
    return (
        <Heading headingTag="h3" heading={title} className="text-[14px] uppercase md:mb-5" /> 
    );
}
 
export default SidebarHeading;