"use client";
import Image from "next/image";
import Link from "next/link";
import { FaAnglesRight } from "react-icons/fa6";

import { formatDateFromDate, getImageURL } from "@/app/libs/function";

interface BlogCarouselItemProps {
  blogItem: any;
  isActive: boolean;
}

const BlogCarouselItem = ({ blogItem, isActive }: BlogCarouselItemProps) => {
  return (
    <div className="w-full mx-auto max-w-[900px] flex flex-wrap items-center gap-10">
      {blogItem && (
        <>
          <div className="w-full md:w-[50%]">
            <div
              className={`relative group block rounded-lg overflow-hidden relative${
                isActive ? " animate-scaleInCenter" : ""
              } pb-[60%]`}
            >
              {blogItem?.attributes?.Image && (
                <Image
                  src={getImageURL(
                    blogItem?.attributes?.Image?.data.attributes.url
                  )}
                  alt={
                    blogItem?.attributes?.Image?.data.attributes.alternativeText
                  }
                  className="w-full group-hover:scale-[1.2] transition-all duration-700"
                  fill
                />
              )}
            </div>
          </div>
          <div className="w-full md:flex-1">
            <ul
              className={`flex flex-wrap items-center gap-5 py-2${
                isActive ? " animate-backInDown" : ""
              }`}
            >
              {blogItem?.attributes?.Collection && (
                <li className="uppercase text-[rgb(var(--second-rgb))] cursor-pointer">
                  {blogItem?.attributes?.Collection?.data?.attributes?.Title}
                </li>
              )}
              {blogItem?.attributes?.publishedAt && (
                <li>
                  {formatDateFromDate(
                    blogItem?.attributes?.publishedAt,
                    "MMMM DD. YYYY"
                  )}
                </li>
              )}
              {blogItem?.attributes?.Author && (
                <li className="cursor-pointer hover:text-[rgb(var(--second-rgb))] capitalize">
                  {blogItem?.attributes?.Author?.data?.attributes?.username}
                </li>
              )}
            </ul>
            <h3
              className={`text-base mb-2 line-clamp-2 h-[3rem]${
                isActive ? " animate-fadeInRight" : ""
              }`}
              style={{ animationDuration: ".5s", animationDelay: ".2s" }}
            >
              {blogItem?.attributes.Title}
            </h3>
            <div className="line-clamp-2 mb-5 ">
              <p
                className={`${isActive ? " animate-fadeInDown" : ""}`}
                style={{ animationDelay: ".8s" }}
              >
                {blogItem?.attributes?.Introduction}
              </p>
            </div>
            <Link
              href={{
                pathname: `/blogs/${blogItem.id}`,
                query: {
                  name: blogItem?.attributes.Title,
                },
              }}
              className={`group${isActive ? " animate-trackingInExpand" : ""}`}
              style={{ animationDelay: "1s" }}
            >
              Read more{" "}
              <FaAnglesRight className="inline-block ml-1 text-[12px] group-hover:animate-shakeNext" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogCarouselItem;
