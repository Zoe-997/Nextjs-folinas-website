"use client";
import { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "./Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit?: any;
    title?: string;
    subTitle?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    loading?: boolean;
    width?: number;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    subTitle,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
    loading,
    width
}) => {
    const [showModal, setShowModal] = useState(isOpen);
    useEffect(() => {
        setShowModal(isOpen);
        const htmlElement = document.getElementsByTagName('html')[0];
        if (isOpen) {
            htmlElement.classList.add('openModal');
        } else {
            htmlElement.classList.remove('openModal');
        }
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
            <div className={`relative w-full md:w-4/6 lg:w-2/5 xl:w-[${width ? width +'px' : '2/5'}] 2xl:w-[${width ? width +'px' : '3/5'}] my-6 mx-auto h-full lg:h-auto md:h-auto`}>
                <div 
                    className={`
                        transition-all duration-300 ease-in-out h-full 
                        ${showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
                    `}>
                        <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none pt-10 md:pt-0">
                            <div className="flex flex-wrap items-center p-6 rounded-t justify-center text-center relative border-b-[1px] ">
                                <h3 className="text-lg font-semibold w-full">{title}</h3>
                                <p className="w-full text-[rgb(var(--note))] text-sm">{subTitle}</p>
                            </div>
                            <button 
                                onClick={handleClose}
                                className="p-1 border-0 hover:opacity-70 transition-all absolute top-5 right-9"
                            >
                                <IoMdClose size={18}/>
                            </button>
                            <div className="relative p-6 flex-auto">{body}</div>
                            <div className="flex flex-col gap-2 p-6">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {handleSecondaryAction && secondaryActionLabel && (
                                        <Button 
                                            disabled={disabled} 
                                            label={secondaryActionLabel} 
                                            onClick={handleSecondaryAction}
                                            loading={loading}
                                            large
                                        />
                                    )}
                                    
                                    {actionLabel && <Button 
                                        disabled={disabled} 
                                        label={actionLabel} 
                                        onClick={handleSubmit}
                                        loading={loading}
                                        large
                                    />}
                                </div>
                            </div>
                            {footer}
                        </div>
                </div>
            </div>
        </div>
    )
};

export default Modal;