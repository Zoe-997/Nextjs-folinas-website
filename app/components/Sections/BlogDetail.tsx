"use client";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import Image from "next/image";

import { formatDateFromDate, getImageURL } from "@/app/libs/function";
import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";
import PageLoading from "@/app/components/Commons/PageLoading";
import Heading from "@/app/components/Commons/Heading";
import Markdown from "@/app/components/Commons/Markdown";

const BlogDetail = ({ repo }: { repo?: any }) => {
  const param = useParams();
  const [BlogById, setBlogById] = useState<any>({});
  const { getBlogsDetail, loading } = useCollectionTypesStores();

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setBlogById(res);
    };
    getBlogsDetail(`${param.id}`, `?populate=*&locale=en`, onSuccess);
  }, [getBlogsDetail, param]);

  return (
    <>
      <div className="flex flex-wrap items-start mt-20">
        {loading && <PageLoading />}
        <div className="md:sticky md:top-[140px] md:w-[30%] transition-all">
          <Heading
            heading={BlogById?.Title}
            headingTag="h2"
            className="text-xl lg:text-3xl"
          />
          <ul className="flex flex-wrap items-center gap-5 py-2">
            <li className="uppercase text-[rgb(var(--second-rgb))] cursor-pointer">
              {BlogById?.Collection?.data?.attributes?.Title}
            </li>
            <li>{formatDateFromDate(BlogById?.createdAt)}</li>
            <li className="cursor-pointer hover:text-[rgb(var(--second-rgb))] capitalize">
              {BlogById?.Author?.data?.attributes?.username}
            </li>
          </ul>
          <div className="group overflow-hidden rounded-lg relative pb-[66.79%]">
            {BlogById?.Image && (
              <>
                <Image
                  src={getImageURL(BlogById?.Image?.data?.attributes?.url)}
                  alt={
                    BlogById?.Image?.data?.alternativeText ||
                    BlogById?.attributes?.Image?.data?.name
                  }
                  className="object-cover w-full group-hover:scale-[1.2] transition-all duration-700"
                  fill
                />
              </>
            )}
          </div>
        </div>
        <div className="md:flex-1 md:pl-10 blog-detail-content">
          <Markdown markdownContent={BlogById?.Content} />
          <div className="mt-[50px] flex flex-wrap items-center">
            <label>Tags:</label>
            <ul className="flex-1 ml-2">
              {BlogById?.Tags?.data?.map((tag: any) => (
                <li
                  key={tag.id}
                  className="inline-block mx-1 border rounded px-3 bg-[rgb(var(--btn-bg))] text-[rgb(var(--btn-text))]"
                >
                  {tag?.attributes?.Title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
