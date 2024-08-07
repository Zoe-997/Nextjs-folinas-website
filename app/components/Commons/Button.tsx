import React from "react";
import { IconType } from "react-icons";
import SectionLoading from "./SectionLoading";

interface ButtonProps {
    label?: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
    icon?: IconType;
    loading?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    medium,
    large,
    icon: Icon,
    loading,
    className
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative flex flex-wrap items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-no-allowed rounded-lg w-full
            ${outline ? 'hover:text-[rgb(var(--link-rgb)]' : 'bg-[rgb(var(--btn-bg))] text-[rgb(var(--btn-text))] hover:bg-[rgb(var(--btn-bg-hv))] hover:text-[rgb(var(--btn-text-hv))]'}
            ${large ? "py-2 text-md font-semibold" : ""}
            ${small ? "py-1 text-sm font-light border-[1px]" : ""}
            ${medium ? "py-2 text-sm font-light" : ""}
            ${className ? className : ''}
            `}
        >
            {Icon && (
                <Icon size={24} className=""/>
            )}
            {label}
            {loading && <SectionLoading />}
        </button>
    )
};

export default Button;