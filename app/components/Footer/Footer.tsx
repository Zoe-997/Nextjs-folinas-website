"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useSingleTypesStores } from "@/app/apis/stores/singleTypesStores";
import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";

import Container from "../Commons/Container";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import CopyRight from "./CopyRight";
import Logo from "../Header/Logo";

const Footer = () => {
  const ref = useRef<any>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [contactInformation, setContactInformation] = useState<any>({});
  const { getContactInformation } = useSingleTypesStores();
  const { getEcosystem } = useCollectionTypesStores();

  const quickLinks = [
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact" },
    { label: "Our Service", href: "/our-services" },
    { label: "Recruitment", href: "/recruitment" },
  ];

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setContactInformation(res);
    };

    getContactInformation(`?populate=*&locale=en`, onSuccess);
  }, [getContactInformation, getEcosystem]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mt-10 md:mt-20">
      <Container>
        <footer className="border-t-[1px]">
          <div className="flex flex-wrap pt-10 -mx-[15px]">
            <div
              className={`px-[15px] w-full md:w-7/12 lg:w-7/12 lg:mb-10 xl:w-[30%]${
                isIntersecting ? " animate__fadeInUp" : ""
              }`}
            >
              <Logo />
            </div>

            <div
              className={`mb-5 px-[15px] w-full md:w-3/12 lg:w-3/12 lg:mb-10 xl:w-[20%]${
                isIntersecting ? " animate__fadeInUp" : ""
              }`}
            >
              <FooterLinks items={quickLinks} title="Navigation" />
            </div>
            <div
              className={`mb-5 px-[15px] w-full md:w-3/12 lg:w-3/12 lg:mb-10 xl:w-[20%]${
                isIntersecting ? " animate__fadeInUp" : ""
              }`}
            >
              <FooterContact
                data={contactInformation}
                heading="Information"
                showContactInformation
              />
            </div>
            <div
              className={`mb-5 px-[15px] w-full md:w-7/12 lg:w-7/12 lg:mb-10 xl:w-3/12${
                isIntersecting ? " animate__fadeInUp" : ""
              }`}
            >
              <FooterContact
                data={contactInformation}
                heading="Opening Hours"
                isShowOpenTime
              />
            </div>
          </div>
          <div className={`${isIntersecting ? "animate__fadeInUp" : ""}`}>
            <CopyRight />
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
