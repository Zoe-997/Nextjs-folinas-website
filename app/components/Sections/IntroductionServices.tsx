"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useSingleTypesStores } from "@/app/apis/stores/singleTypesStores";
import Heading from "@/app/components/Commons/Heading";
import Richtext from "@/app/components/Commons/RichText";
import { getImageURL } from "@/app/libs/function";

interface IntroductionServicesProps {}

const IntroductionServices = ({}: IntroductionServicesProps) => {
  const [serviceIntroduction, setSerViceIntroduction] = useState<any>({});
  const { getServiceIntroduction } = useSingleTypesStores();

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setSerViceIntroduction(res);
    };
    getServiceIntroduction(`?populate=*&locale=en`, onSuccess);
  }, [getServiceIntroduction]);

  return (
    <div id="introduction-services" className="mt-10">
      <div className="flex flex-wrap items-center -mx-[15px]">
        <div className="w-full lg:w-[50%] px-[15px] mb-[30px] lg:mb-0">
          {serviceIntroduction?.Title !== null && (
            <Heading headingTag="h2" heading={serviceIntroduction?.Title} />
          )}
          <Richtext richtextContent={serviceIntroduction?.Content} />
        </div>
        <div className="w-full lg:w-[50%] px-[15px] relative h-[300px] md:h-[400px]">
          {serviceIntroduction?.Image && (
            <Image
              src={getImageURL(serviceIntroduction?.Image?.data.attributes.url)}
              alt={serviceIntroduction?.Image?.data.attributes.alternativeText}
              className="object-contain"
              fill
              priority={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroductionServices;
