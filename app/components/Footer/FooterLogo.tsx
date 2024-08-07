"use client";
import Image from "next/image";
import Link from "next/link";

import LogoImage from "@/public/images/logo.png";

import Social from "@/app/components/Commons/Social";

const FooterLogo = ({ data }: any) => {
  return (
    <div>
      <Image
        src={LogoImage}
        alt="Logo"
        className="max-h-[52px] w-auto"
        width={1020}
        height={536}
        priority={false}
      />
      <div className="mt-5">
        <p className="mb-5">If you have any question, please contact us at:</p>
        <Link
          title="Hotline"
          href={`tel: ${data.Phone}`}
          className="text-2xl md:text-3xl font-semibold text-[rgba(var(--second-rgb))]"
        >
          {data.Phone}
        </Link>
      </div>
      <Social />
    </div>
  );
};

export default FooterLogo;
