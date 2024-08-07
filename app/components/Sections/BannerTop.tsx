"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaAnglesRight } from "react-icons/fa6";
import Carousel from "react-multi-carousel";

import { useSingleTypesStores } from "@/app/apis/stores/singleTypesStores";
import { getImageURL } from "@/app/libs/function";
import { initialResponsive } from "@/app/libs/carousel";

import Container from "@/app/components/Commons/Container";
import Richtext from "@/app/components/Commons/RichText";

import LogoImage from "@/public/images/logo.png";

const BannerTop = () => {
  const [bannerTopList, setBannerTopList] = useState<any>([]);
  const [renderDotsOutside, setRenderDotsOutside] = useState(false);
  const { getBannerTopCarousel, loading } = useSingleTypesStores();

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setBannerTopList(res);
    };

    getBannerTopCarousel(`?populate=*&locale=en`, onSuccess);
  }, [getBannerTopCarousel]);

  useEffect(() => {
    const checkScreenWidth = () => {
      if (typeof window !== "undefined") {
        setRenderDotsOutside(window.innerWidth < 768);
      }
    };
    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  const CustomDot = ({ onMove, index, onClick, active }: any) => {
    return (
      <li
        key={bannerTopList[index]?.id}
        className={`${active ? "active" : "inactive"} relative`}
      >
        <div
          className={`z-[1] relative ${
            active ? "w-[50px] h-[50px]" : "w-[30px] h-[30;px]"
          } overflow-hidden transition-all duration-500 cursor-pointer mx-auto`}
          onClick={() => onClick()}
        >
          {bannerTopList[index]?.attributes?.BrandFavicon && (
            <Image
              src={
                getImageURL(
                  bannerTopList[index]?.attributes?.BrandFavicon?.data
                    ?.attributes?.url
                ) || LogoImage
              }
              alt={
                bannerTopList[index]?.attributes?.BrandFavicon?.data?.attributes
                  ?.alternativeText || "Banner top"
              }
              fill
              className="object-cover"
            />
          )}
        </div>
      </li>
    );
  };

  return (
    <div className="relative overflow-hidden">
      {bannerTopList.length > 0 && (
        <Carousel
          arrows={false}
          renderDotsOutside={renderDotsOutside}
          responsive={initialResponsive}
          showDots
          draggable={false}
          customDot={<CustomDot />}
          className="banner-top-slider"
        >
          {bannerTopList?.map((banner: any) => {
            const bannerTopImage = banner?.attributes?.Image?.data?.attributes;

            return (
              <div key={banner.id}>
                <div className="pb-[100%] md:pb-[48.16%] md:h-screen">
                  <Image
                    src={getImageURL(bannerTopImage?.url)}
                    alt={bannerTopImage?.alternativeText || "Banner Top"}
                    className="object-cover"
                    fill
                    priority={true}
                  />
                </div>
                <div className="absolute right-0 bottom-[2rem] md:bottom-[6.5rem] left-0 flex text-center justify-center z-[1] text-white">
                  <Container>
                    {banner?.attributes?.BrandLogo?.data?.attributes && (
                      <div className="">
                        <Image
                          src={getImageURL(
                            banner?.attributes?.BrandLogo?.data?.attributes?.url
                          )}
                          alt={
                            bannerTopImage?.alternativeText ||
                            "Banner Top Brand"
                          }
                          className="w-auto max-w-[14rem] max-h-[5rem] mx-auto object-cover"
                          width={100}
                          height={50}
                          priority={false}
                        />
                      </div>
                    )}
                    {banner.attributes.Caption?.length > 0 &&
                      banner.attributes.Caption[0].children?.[0].text !==
                        "" && (
                        <div>
                          <Richtext
                            richtextContent={banner.attributes.Caption}
                          />
                        </div>
                      )}
                    {banner.attributes.LinkTitle && (
                      <p>
                        <Link
                          href={banner.attributes.Link || "#"}
                          className="group"
                          target="_blank"
                        >
                          <span>{banner.attributes.LinkTitle}</span>
                          <FaAnglesRight className="inline-block ml-2 text-[12px] group-hover:animate-shakeNext" />
                        </Link>
                      </p>
                    )}
                  </Container>
                </div>
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default BannerTop;
