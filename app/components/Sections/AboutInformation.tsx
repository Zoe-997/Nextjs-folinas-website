"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useSingleTypesStores } from "@/app/apis/stores/singleTypesStores";
import { getImageURL } from "@/app/libs/function";

import Richtext from "@/app/components/Commons/RichText";
import Heading from "@/app/components/Commons/Heading";

interface AboutInformationProps {}

const AboutInformation = ({}: AboutInformationProps) => {
  const [aboutIntroduction, setAboutIntroduction] = useState<any>({});
  const { getAboutInformation } = useSingleTypesStores();

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setAboutIntroduction(res);
    };
    getAboutInformation(`?populate=*&locale=en`, onSuccess);
  }, [getAboutInformation]);

  return (
    <div className="flex flex-wrap justify-between gap-10">
      {aboutIntroduction && (
        <>
          <div className="w-full lg:w-[50%] mb-[30px] lg:mb-0">
            <div>
              <Heading headingTag="h2" heading={aboutIntroduction?.Title} />
              <Richtext richtextContent={aboutIntroduction.Content} />
            </div>
          </div>
          <div className="w-full lg:flex-1">
            <div className="rounded-md overflow-hidden relative h-[300px] md:h-[400px]">
              {aboutIntroduction?.Image && (
                <Image
                  src={getImageURL(
                    aboutIntroduction?.Image?.data.attributes?.url
                  )}
                  alt={
                    aboutIntroduction?.Image?.data.attributes.alternativeText
                  }
                  className="object-cover object-bottom"
                  fill
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AboutInformation;
