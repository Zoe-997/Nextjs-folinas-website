import { VscLoading } from "react-icons/vsc";

const SectionLoading = () => {
    return (
        <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-[rgb(0_0_0_/_20%)]">
            <VscLoading size={40} className="text-[rgb(var(--link-rgb))] animate-rotateCenter" />
        </div>
    );
}
 
export default SectionLoading;