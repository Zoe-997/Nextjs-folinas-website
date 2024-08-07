"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import LogoImage from "@/public/images/logo.png";
import { getImageURL } from "@/app/libs/function";
import { useSingleTypesStores } from "@/app/apis/stores/singleTypesStores";

interface LogoProps {
  pathName?: string[];
  isHeader?: boolean;
}

const Logo = ({ pathName, isHeader }: LogoProps) => {
  const [dataLogo, setDataLogo] = useState<any>({});
  const { getLogo } = useSingleTypesStores();

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setDataLogo(res);
    };

    getLogo(onSuccess);
  }, [getLogo]);

  const HeaderLogoImage = () => {
    const defaultWidth = 50;
    const defaultHeight = 50;

    const isSmallScreen =
      typeof window !== "undefined" && window.innerWidth < 678;

    const logoWidth = isSmallScreen
      ? "50px"
      : `${dataLogo?.LogoWidth || defaultWidth}px`;
    const logoHeight = isSmallScreen
      ? "50px"
      : `${dataLogo?.LogoHeight || defaultHeight}px`;
    return (
      <span
        className="relative block"
        style={{
          width: logoWidth,
          height: logoHeight,
        }}
      >
        {dataLogo?.Logo?.data?.attributes && (
          <Image
            src={
              getImageURL(dataLogo?.Logo?.data?.attributes?.url) || LogoImage
            }
            alt="Logo"
            className="absolute top-0 left-0 w-full h-full object-cover"
            width={dataLogo?.LogoWidth || 50}
            height={dataLogo?.LogoWidth || 50}
          />
        )}
      </span>
    );
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center xl:justify-start flex-1 xl:flex-[initial]">
        {isHeader ? (
          <>
            {pathName && pathName.length === 0 ? (
              <h1>
                <HeaderLogoImage />
              </h1>
            ) : (
              <Link href="/">
                <HeaderLogoImage />
              </Link>
            )}
          </>
        ) : (
          <>
            {dataLogo?.LogoFooter?.data?.attributes && (
              <>
                <Image
                  src={
                    getImageURL(dataLogo?.LogoFooter?.data?.attributes?.url) ||
                    LogoImage
                  }
                  alt="Logo"
                  className="w-full max-w-[300px]"
                  width={1020}
                  height={536}
                />
                {dataLogo?.LogoFooter?.data?.attributes?.caption && (
                  <div className="max-w-[410px]">
                    {dataLogo?.LogoFooter?.data?.attributes?.caption}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Logo;
