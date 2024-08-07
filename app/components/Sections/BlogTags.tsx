"use client";
import { useEffect, useState } from "react";
import SidebarHeading from "@/app/components/Commons/SidebarHeading";

const BlogTags = ({ data, tagSelect }: any) => {
  const [blogTags, setBlogTags] = useState<any>([]);

  useEffect(() => {
    setBlogTags(data);
  }, [data]);

  return (
    <div>
      <SidebarHeading title="Blog tags" />
      <ul>
        {blogTags.map((item: any) => (
          <li
            key={item.id}
            onClick={() => tagSelect(item.id)}
            className="inline-block mr-2 mb-2 border-[1px] rounded px-3 capitalize cursor-pointer hover:border-[rgb(var(--second-rgb))] hover:text-[rgb(var(--second-rgb))]"
          >
            {item?.attributes?.Title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogTags;
