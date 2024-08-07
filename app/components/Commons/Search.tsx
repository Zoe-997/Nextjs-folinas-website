'use client';
import { useState, ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";

const Search = ({ searchKey }: any) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };    

    const handleSearch = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchKey(searchQuery);
    };

    return (
        <form onSubmit={handleSearch} className="flex flex-wrap border-[1px] px-2 py-2 w-full outline-none focus-within:border-[rgb(var(--second-rgb))]">
            <input type="text" placeholder="Search..." 
                className="text-sm w-full flex-1 px-1 outline-none border-r-[1px] bg-[transparent]" 
                onChange={handleInputChange}
            />
            <button type="submit" className="px-3 hover:text-[rgb(var(--second-rgb))]"><FiSearch /></button>
        </form>
    );
}
 
export default Search;