import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    placeholder?: string;
    type?: string;
    formatPrice?: boolean;
    required?: boolean;
    onChange: any;
    min?: number;
    max?: number;
    value?: any;
    className?: string;
    accept?: string;
    pattern?: string;
}

const Input: React.FC<InputProps> = ({
    id,
    placeholder,
    type,
    formatPrice,
    required,
    onChange,
    min,
    max,
    value,
    className,
    accept,
    pattern
}) => {    
    return (
        <div className="w-full relative">
            {formatPrice && (
                <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2"/>
            )}
            <input type={type} id={id} name={id}
                placeholder={placeholder}
                className={`appearance-none ${type !== 'file' && 'border py-2 px-3'} rounded-sm w-full leading-tight focus:outline-none focus:border-[rgb(var(--second-rgb))] ${className&&className}`}
                min={min ? min : ''}
                max={max ? max : ''}
                onChange={onChange}
                value={value}
                accept={accept}
                required
                pattern={pattern}
            />
        </div>
    )
};

export default Input;