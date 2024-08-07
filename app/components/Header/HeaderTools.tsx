"use client";
import Search from "./Search";

const HeaderTools = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-10">
      <div className="flex flex-wrap items-center gap-3">
        <Search />
      </div>
    </div>
  );
};

export default HeaderTools;
