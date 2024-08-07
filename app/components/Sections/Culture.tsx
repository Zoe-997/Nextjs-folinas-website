"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";

import { useSingleTypesStores } from "@/app/apis/stores/singleTypesStores";
import { initialResponsive } from "@/app/libs/carousel";
import { getImageURL } from "@/app/libs/function";

import Container from "../Commons/Container";
import Richtext from "../Commons/RichText";
import Heading from "../Commons/Heading";
import BackgroundEllipse from "./BackgroundEllipse";

interface CultureProps {}

const Culture = ({}: CultureProps) => {
  const [culture, setCulture] = useState<any>({});
  const [cultureList, setCultureList] = useState<any>({});
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { getCulture, getCultureItems, loading } = useSingleTypesStores();
  const ref = useRef<any>(null);
  const bgItems = [
    {
      width: 10,
      width_desktop: 20,
      top: 0,
      right: -5,
      bg: "linear-gradient(44.11deg, rgba(251, 137, 4, 0.6) 8.94%, rgba(255, 255, 255, 0) 86.73%)",
    },
    {
      width: 20,
      width_desktop: 40,
      left: -5,
      bottom: 2,
      bg: "linear-gradient(44.11deg, rgba(241, 75, 33, 0.75) 8.94%, rgba(255, 255, 255, 0) 86.73%)",
    },
  ];

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setCulture(res);
    };

    const onSuccessCultureItem = (res: any) => {
      if (res) setCultureList(res);
    };

    getCulture(`?populate=*&locale=en`, onSuccess);
    getCultureItems(`?populate=*&locale=en`, onSuccessCultureItem);
  }, [getCulture, getCultureItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }
      // { rootMargin: "-300px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative">
      <Container>
        {culture && (
          <div className="flex flex-wrap gap-10">
            <div
              className={`w-full md:flex-1${
                isIntersecting ? " animate__fadeInUp" : ""
              }`}
            >
              {culture.attributes?.Title && (
                <Heading heading={culture.attributes?.Title} headingTag="h2" />
              )}
              {culture.attributes?.Content && (
                <Richtext richtextContent={culture.attributes?.Content} />
              )}
            </div>
            <div className="w-full md:w-[60%] culture-carousel">
              {cultureList.length > 0 && (
                <Carousel
                  responsive={initialResponsive}
                  showDots={false}
                  className="-mx-3 md:mx-0"
                  infinite
                >
                  {cultureList?.map((item: any) => (
                    <div key={item.id} className="px-3 md:px-0">
                      {item.attributes?.Image && (
                        <div
                          className={`relative w-full pb-[56%] mb-10 rounded-t-xl overflow-hidden${
                            isIntersecting ? " animate__fadeInUp" : ""
                          }`}
                        >
                          <Image
                            src={getImageURL(
                              item.attributes?.Image?.data?.attributes?.url
                            )}
                            alt={
                              item.attributes?.Image?.data?.attributes
                                ?.alternativeText || "Culture"
                            }
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`max-w-[750px] mx-auto px-5 md:px-10 line-clamp-[8]${
                          isIntersecting ? " animate__fadeInUp" : ""
                        }`}
                      >
                        <Richtext richtextContent={item.attributes?.Content} />
                      </div>
                    </div>
                  ))}
                </Carousel>
              )}
            </div>
          </div>
        )}
      </Container>
      <BackgroundEllipse activeBlock={isIntersecting} data={bgItems} />
    </div>
  );
};

export default Culture;
