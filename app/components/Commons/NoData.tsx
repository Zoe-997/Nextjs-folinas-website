"use client";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

const NoData = () => {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center p-5 text-[#ab0505] dark:text-white">
      <MdOutlineReportGmailerrorred size={30} /> <i>No data</i>
    </div>
  );
};

export default NoData;
