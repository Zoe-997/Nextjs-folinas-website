"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

import AboutImage from "@/public/images/logo.png";
import { useSingleTypesStores } from "@/app/apis/stores/singleTypesStores";
import Heading from "@/app/components/Commons/Heading";
import { getImageURL } from "@/app/libs/function";

interface TalkingNumberProps {
  talkingNumberItems: string[];
}

const TalkingNumber = ({ talkingNumberItems }: TalkingNumberProps) => {
  const [talkingNumber, setTalkingNumber] = useState<any>({});
  const { getTalkingNumber } = useSingleTypesStores();

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setTalkingNumber(res);
    };
    getTalkingNumber(`?populate=*&locale=en`, onSuccess);
  }, [getTalkingNumber]);

  const dataNumber = [
    {
      number: talkingNumber?.Years,
      title: talkingNumberItems[0],
    },
    {
      number: talkingNumber?.Staff,
      title: talkingNumberItems[1],
    },
    {
      number: talkingNumber?.Branch,
      title: talkingNumberItems[2],
    },
    {
      number: talkingNumber?.Partners,
      title: talkingNumberItems[3],
    },
  ];

  return (
    <div className="mt-20 flex flex-wrap -mx-[15px]">
      <div className="px-[15px] w-full lg:w-[50%] order-2 lg:order-1">
        <div className="relative rounded-md overflow-hidden pb-[56.23%]">
          <Image
            src={
              getImageURL(talkingNumber?.Image?.data?.attributes?.url) ||
              AboutImage
            }
            alt={
              talkingNumber?.Image?.data?.attributes?.alternativeText ||
              "Talking Number Image"
            }
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="px-[15px] w-full lg:w-[50%] order-1 lg:order-2 mb-[30px] lg:mb-0">
        <Heading
          headingTag="h2"
          heading={talkingNumber?.Title}
          className="md:text-[38px]"
        />
        <div className="lg:pl-10">
          {dataNumber.map((item, index) => (
            <div
              key={index}
              className="flex flex-wrap items-end mb-10 last:mb-0 group"
            >
              <span className="text-[rgb(var(--second-rgb))] text-3xl lg:text-5xl font-semibold min-w-[80px] lg:min-w-[120px] group-hover:scale-125 transition-all duration-500">
                {item.number} +
              </span>
              <p className="ml-6 flex-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalkingNumber;
