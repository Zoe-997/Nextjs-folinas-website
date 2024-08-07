"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaAnglesRight } from "react-icons/fa6";

import { formatDateFromDate, getImageURL } from "@/app/libs/function";

import NoData from "@/app/components/Commons/NoData";
import Markdown from "@/app/components/Commons/Markdown";

const BlogMainContent = ({ data }: any) => {
  const [blogList, setBlogList] = useState<any>([]);

  useEffect(() => {
    setBlogList(data);
  }, [data]);

  return (
    <div className="w-full md:flex-1 lg:pl-[50px]">
      {!blogList.length && <NoData />}
      {blogList.length > 0 && (
        <ul className="flex flex-wrap -mx-3">
          {blogList.map((item: any) => {
            const itemTitle = item?.attributes?.Title;
            return (
              <li key={item?.id} className="sm:w-1/2 lg:w-1/3 px-3 mb-6">
                <Link
                  className="group block rounded-lg overflow-hidden relative pb-[60%]"
                  href={{
                    pathname: `/blogs/${item?.id}`,
                    // query: {
                    //   name: itemTitle,
                    // },
                  }}
                  title={itemTitle}
                >
                  {item?.attributes?.Image && (
                    <Image
                      src={getImageURL(
                        item?.attributes?.Image?.data?.attributes?.url
                      )}
                      alt={
                        item?.attributes?.Image?.data?.attributes
                          ?.alternativeText || "Blog Post"
                      }
                      className="w-full group-hover:scale-[1.2] transition-all duration-700"
                      fill
                    />
                  )}
                </Link>
                <ul className="flex flex-wrap items-center gap-5 py-2">
                  {item?.attributes?.Collection && (
                    <li className="uppercase text-[rgb(var(--second-rgb))] cursor-pointer">
                      {item?.attributes?.Collection?.data?.attributes?.Title}
                    </li>
                  )}
                  {item?.attributes?.publishedAt && (
                    <li>
                      {formatDateFromDate(
                        item?.attributes?.publishedAt,
                        "MMMM DD. YYYY"
                      )}
                    </li>
                  )}
                  {item?.attributes?.Author && (
                    <li className="cursor-pointer hover:text-[rgb(var(--second-rgb))] capitalize">
                      {item?.attributes?.Author?.data?.attributes?.username}
                    </li>
                  )}
                </ul>
                <Link
                  className="group block rounded-lg overflow-hidden"
                  href={{
                    pathname: `/blogs/${item.id}`,
                    // query: {
                    //   name: itemTitle,
                    // },
                  }}
                  title={itemTitle}
                >
                  <h3 className="text-base mb-2 line-clamp-2 h-[3rem]">
                    {itemTitle}
                  </h3>
                </Link>
                <div className="line-clamp-2 mb-5">
                  <Markdown markdownContent={item?.attributes?.Introduction} />
                </div>
                <Link
                  className="group"
                  href={{
                    pathname: `/blogs/${item.id}`,
                    // query: {
                    //   name: itemTitle,
                    // },
                  }}
                >
                  Read more{" "}
                  <FaAnglesRight className="inline-block ml-1 text-[12px] opacity-0 group-hover:opacity-100 animate-shakeNext" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default BlogMainContent;
