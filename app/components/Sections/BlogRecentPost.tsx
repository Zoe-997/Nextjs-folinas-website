"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { formatDateFromDate, getImageURL } from "@/app/libs/function";

import SidebarHeading from "@/app/components/Commons/SidebarHeading";

const BlogRecentPost = ({ data }: { data: any }) => {
  const currentDate = new Date();
  const [recentPost, setRecentPost] = useState<any>([]);

  useEffect(() => {
    if (data.length > 0) {
      const filteredData = data?.filter(
        (item: any) => new Date(item?.attributes?.publishedAt) <= currentDate
      );
      const sortedData = filteredData.sort((a: any, b: any) => {
        const dateA: Date = new Date(a.time_start);
        const dateB: Date = new Date(b.time_start);
        return dateB.getTime() - dateA.getTime();
      });
      setRecentPost(sortedData.slice(0, 3));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div>
      <SidebarHeading title="Recent Post" />
      {recentPost.length > 0 && (
        <ul>
          {recentPost.map((item: any, index: number) => {
            return (
              <li key={index} className="flex flex-wrap mb-7 last:mb-0">
                <div className="w-[70px] h-[70px] rounded-full overflow-hidden relative">
                  {item?.attributes?.Image && (
                    <Image
                      src={getImageURL(
                        item?.attributes?.Image?.data?.attributes?.url
                      )}
                      alt={`${item?.attributes?.Title}`}
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
                <div className="flex-1 pl-5">
                  <Link
                    href={{
                      pathname: `/blogs/${item.id}`,
                    }}
                    title={item?.attributes?.Title}
                  >
                    <h3
                      className="text-sm line-clamp-2"
                      title={item?.attributes?.Title}
                    >
                      {item?.attributes?.Title}
                    </h3>
                  </Link>
                  <p>
                    {formatDateFromDate(
                      item?.attributes?.publishedAt,
                      "MMMM DD. YYYY"
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BlogRecentPost;
