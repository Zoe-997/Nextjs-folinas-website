"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";
import { getImageURL } from "@/app/libs/function";

import Container from "@/app/components/Commons/Container";
import Heading from "@/app/components/Commons/Heading";
import Richtext from "@/app/components/Commons/RichText";

interface OurServicesProps {
  heading: string;
}

const OurServices = ({ heading }: OurServicesProps) => {
  const [services, setServices] = useState<any>({});
  const { getServicesItems } = useCollectionTypesStores();

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setServices(res);
    };
    getServicesItems(`?populate=*&locale=en`, onSuccess);
  }, [getServicesItems]);

  return (
    <div id="our-services" className="mt-20">
      <Container>
        <Heading headingTag="h2" heading={heading} className="text-center" />
        <div className="mt-5 flex flex-wrap -mx-[15px]">
          {services.length > 0 &&
            services.map((item: any, index: number) => (
              <div
                key={index}
                className="w-full lg:w-[50%] px-[15px] mb-[30px]"
              >
                <div className="h-full p-5 flex flex-wrap hover:bg-[rgb(var(--second-rgb)_/5%)] rounded-md border-[1px]">
                  <div className="mb-10 lg:mb-0 lg:mr-10 w-[80px] h-[80px] flex items-center justify-center rounded-full bg-[rgb(var(--second-rgb)_/50%)]">
                    {item?.attributes?.Image && (
                      <Image
                        src={getImageURL(
                          item?.attributes?.Image?.data.attributes.url
                        )}
                        alt={
                          item?.attributes?.Image.data.attributes
                            .alternativeText
                        }
                        width={40}
                        height={40}
                        priority={false}
                      />
                    )}
                  </div>
                  <div className="w-full lg:flex-1">
                    <Heading
                      headingTag="h3"
                      heading={item?.attributes?.Title}
                    />
                    {item?.attributes?.Content && (
                      <Richtext richtextContent={item?.attributes?.Content} />
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default OurServices;
