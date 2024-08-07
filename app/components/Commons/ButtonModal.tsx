interface ButtonModalProps {
    isOpenModal: boolean;
    onClick: () => void;
    isScroll?: boolean;
    className?: string;
}

const ButtonModal = ({ isOpenModal, isScroll, onClick, className }: ButtonModalProps) => {
    return (
        <button className={`relative w-[20px] h-[16px]${className?' '+className:''}`} onClick={onClick}>
            <span className={`transition-all duration-500 absolute left-0 right-0 h-[1px] ${isScroll ? 'bg-black' : 'bg-white'} ${isOpenModal ? '-rotate-[45deg] top-1/2' : 'top-0'}`}></span>
            <span className={`absolute left-0 right-0 top-1/2 h-[1px] ${isScroll ? 'bg-black' : 'bg-white'}${isOpenModal ? ' hidden' : ''}`}></span>
            <span className={`transition-all duration-500 absolute left-0 right-0 h-[1px] ${isScroll ? 'bg-black' : 'bg-white'} ${isOpenModal ? 'rotate-[45deg] top-1/2' : 'bottom-0'}`}></span>
        </button>
    );
}
 
export default ButtonModal;