"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useSingleTypesStores } from "@/app/apis/stores/singleTypesStores";
import { getImageURL } from "@/app/libs/function";
import { BreadcrumbsItem } from "@/app/types";

import Container from "@/app/components/Commons/Container";
import Heading from "@/app/components/Commons/Heading";

interface BreadcrumbsProps {
  title: string;
  items: BreadcrumbsItem[];
}

const Breadcrumbs = ({ title, items }: BreadcrumbsProps) => {
  const [breadCrumb, setBreadCrumb] = useState<any>([]);
  const { getBreadCrumb } = useSingleTypesStores();

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setBreadCrumb(res);
    };
    getBreadCrumb(onSuccess);
  }, [getBreadCrumb]);

  return (
    <div className="relative after:bg-[rgba(0,_0,_0,_.3)] mb-20  after:absolute after:top-0 after:right-0 after:bottom-0 after:left-0 overflow-hidden">
      <div className="relative pb-[100%] md:pb-[48.17%]">
        {breadCrumb?.Image && (
          <Image
            src={getImageURL(breadCrumb?.Image?.data.attributes.url)}
            alt={
              breadCrumb?.Image?.data.attributes.alternativeText || "BreadCrumb"
            }
            className="absolute top-0 left-0 w-full h-full object-cover"
            width={3000}
            height={900}
          />
        )}
      </div>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center text-center z-[1] text-white">
        <Container>
          <div className="line-clamp-3 mb-5 capitalize">
            <Heading headingTag="h1" heading={title} />
          </div>
          <ul className="flex flex-wrap justify-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            {items?.map((item: any, index) => (
              <li key={index}>
                {items.length - 1 !== index && (
                  <>
                    &nbsp;/&nbsp;
                    <Link href={item}>{decodeURI(item.title)}</Link>
                  </>
                )}
                {items.length - 1 === index && (
                  <span className="line-clamp-1 inline-block">
                    &nbsp;/&nbsp;{item.title}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </div>
  );
};

export default Breadcrumbs;
