import { useEffect, useState, useRef } from "react";
import { FaAngleDown } from "react-icons/fa6";

interface SelectOptionProps {
    label: string;
    options: {
        id: number,
        title: string;
    }[];
    className?: string;
    optionSelected: any;
    name: string;
}

const SelectOption = ({ options, label, className, optionSelected, name }: SelectOptionProps) => {
    const [openOptions, setOpenOptions] = useState(false);
    const [selected, setSelected] = useState("");
    const dropdownRef = useRef<any>(null);

    const handleSelectedOption = (id: number) => {
        const selectedLabel = options.find((item: any) => item.id === id);
        if (selectedLabel) setSelected(selectedLabel.title);
        optionSelected(id, name);
        setOpenOptions(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current instanceof Element && !dropdownRef.current.contains(event.target as Node)) {
                setOpenOptions(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);      

    return (
        <div className={`w-full relative ${className ? className : ''}`} data-name={name} ref={dropdownRef}>
            <label className={`flex flex-wrap gap-1 items-center py-2 px-3 cursor-pointer border rounded-sm leading-tight ${openOptions ? 'border-[rgb(var(--second-rgb))]' : ''}`}
                onClick={() => setOpenOptions(!openOptions)}
            >
                <span className="flex-1">{selected === "" ? label : selected}</span>
                <FaAngleDown />
            </label>
            <ul className={`absolute left-0 right-0 transition-all duration-500 z-1 bg-white text-black rounded-md overflow-hidden
                ${openOptions ? 'top-[calc(100%+5px)] opacity-100 visible' : 'top-[calc(100%+20px)] opacity-0 invisible'}`}
                style={{ boxShadow: 'var(--box-shadow)' }}
            >
                {options?.map((option: any) => (
                    <li key={option.id} value={option.id} className="hover:bg-[#EEF6FC] text-black py-1 px-3 cursor-pointer"
                        onClick={() => handleSelectedOption(option.id)}
                    >
                        {option?.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SelectOption;