"use client";
import { useState, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";

import Heading from "@/app/components/Commons/Heading";

const Search = () => {
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchQueryLinks, setSearchQueryLinks] = useState<any>([]);
  const [searchKeys, setSearchKey] = useState<any[]>([]);
  const { getKeySearch } = useCollectionTypesStores();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (openSearchModal) setSearchQuery(event.target.value);
    else setSearchQuery("");
  };

  const handleSearch = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchLinks = searchKeys.filter((item: any) =>
      item.attributes.Key.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (searchLinks) setSearchQueryLinks(searchLinks);
  };

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setSearchKey(res);
    };
    getKeySearch(`?populate=*&locale=en`, onSuccess);
  }, [getKeySearch]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpenSearchModal(!openSearchModal)}
        className="w-[36px] h-[36px] rounded-full bg-[rgb(var(--btn-bg))] text-[rgb(var(--btn-text))] flex items-center justify-center relative z-[2]"
      >
        {openSearchModal ? <IoCloseOutline /> : <FiSearch />}
      </button>
      <div
        className={`absolute top-[50%] -translate-y-[50%] bg-white text-black transition-all z-[1] duration-500 shadow-[var(--box-shadow)] ${
          openSearchModal
            ? "right-[115%] visible w-[250px]"
            : "opacity-0 invisible right-0 w-0"
        }`}
      >
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap border-[1px] px-2 py-2 w-full"
        >
          <input
            type="text"
            placeholder="Search..."
            className="text-sm w-full flex-1 px-1 outline-none border-r-[1px]"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="px-1 hover:text-[rgb(var(--second-rgb))]"
          >
            <FiSearch />
          </button>
        </form>
      </div>
      <div
        className={`absolute top-[calc(100%+5px)] right-[115%] w-[250px] p-3 transition-all z-[1] duration-500 bg-white text-black ${
          openSearchModal && searchQuery ? "visible" : "hidden"
        }`}
      >
        <Heading
          headingTag="h3"
          heading="Popular search results"
          className="mb-2 md:mb-2 text-sm"
        />
        {searchQueryLinks?.length < 0 && <p>No result.</p>}
        {searchQueryLinks?.length > 0 && (
          <ul>
            {searchQueryLinks?.map((item: any, index: number) => (
              <li key={index}>
                <Link href={item?.attributes?.Link}>
                  {item?.attributes?.Key}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
