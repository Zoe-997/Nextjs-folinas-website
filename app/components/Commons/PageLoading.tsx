import { VscLoading } from "react-icons/vsc";

const PageLoading = () => {
    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center gap-5 justify-center bg-white z-[100]">
            <VscLoading size={40} className="text-[rgb(var(--link-rgb))] animate-rotateCenter" />
            Loading...
        </div>
    );
}
 
export default PageLoading;