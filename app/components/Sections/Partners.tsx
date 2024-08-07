"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";
import Container from "@/app/components/Commons/Container";
import { getImageURL } from "@/app/libs/function";

import Heading from "@/app/components/Commons/Heading";
import Richtext from "@/app/components/Commons/RichText";

import LogoImage from "@/public/images/logo.png";
import BackgroundEllipse from "./BackgroundEllipse";

interface PartnersProps {}

const Partners = ({}: PartnersProps) => {
  const ref = useRef<any>(null);
  const [partnersList, setPartnersList] = useState<any>([]);
  const [partnerIntro, setPartnerIntro] = useState<any>({});
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { getPartner, getPartnerItems, loading } = useCollectionTypesStores();
  const bgItems = [
    {
      width: 4,
      width_desktop: 6.9,
      top: 5,
      left: 2,
      bg: "linear-gradient(44.11deg, rgba(255, 234, 153, 0.75) 8.94%, rgba(255, 255, 255, 0) 86.73%)",
    },
  ];

  useEffect(() => {
    const onSuccessIntro = (res: any) => {
      if (res) setPartnerIntro(res);
    };

    const onSuccess = (res: any) => {
      if (res) setPartnersList(res);
    };

    getPartner(`?populate=*&local=en`, onSuccessIntro);
    getPartnerItems(`?populate=*`, onSuccess);
  }, [getPartner, getPartnerItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const imagePartner = (src: string, alt: string) => {
    return (
      <Image
        className="group-hover:scale-110 transition-all duration-500"
        src={getImageURL(src) || LogoImage}
        alt={alt || "Partner"}
        fill
      />
    );
  };

  return (
    <div ref={ref} className="relative">
      {partnerIntro && partnersList?.length > 0 && (
        <Container>
          {partnerIntro?.Title && (
            <Heading
              headingTag="h2"
              heading={partnerIntro?.Title}
              className={`${isIntersecting ? " animate__fadeInUp" : ""}`}
            />
          )}
          {partnerIntro?.Content && (
            <div>
              <Richtext richtextContent={partnerIntro?.Content} />
            </div>
          )}

          <ul className="mt-5 md:mt-10 lg:mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-10">
            {partnersList.map((partner: any, index: number) => (
              <li
                key={partner.id}
                className={`relative pb-[45.87%]${
                  isIntersecting ? " animate__fadeInUp" : ""
                }`}
                title={partner.attributes.Title}
              >
                {partner?.attributes?.Link ? (
                  <Link href={partner?.attributes?.Link} className="group">
                    {partner?.attributes?.Logo &&
                      imagePartner(
                        partner?.attributes?.Logo?.data?.attributes?.url,
                        partner?.attributes?.Logo?.data?.attributes
                          ?.alternativeText
                      )}
                  </Link>
                ) : (
                  <span>
                    {partner?.attributes?.Logo &&
                      imagePartner(
                        partner?.attributes?.Logo?.data?.attributes?.url,
                        partner?.attributes?.Logo?.data?.attributes
                          ?.alternativeText
                      )}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Container>
      )}
      <BackgroundEllipse activeBlock={isIntersecting} data={bgItems} />
    </div>
  );
};

export default Partners;
