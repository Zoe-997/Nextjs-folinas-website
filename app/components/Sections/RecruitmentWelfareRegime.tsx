"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";
import { getImageURL } from "@/app/libs/function";
import Container from "@/app/components/Commons/Container";
import Heading from "@/app/components/Commons/Heading";
import Richtext from "@/app/components/Commons/RichText";

const RecruitmentWelfareRegime = () => {
  const [recruitmentWelfareRegimeData, setRecruitmentWelfareRegimeData] =
    useState<any>([]);
  const { getRecruitmentWelfareRegimes } = useCollectionTypesStores();

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setRecruitmentWelfareRegimeData(res);
    };
    getRecruitmentWelfareRegimes(`?populate=*&locale=en`, onSuccess);
  }, [getRecruitmentWelfareRegimes]);

  return (
    <div className="bg-[#EEF6FC] dark:bg-transparent pt-20 md:pt-[80px] pb-10">
      <Container>
        <Heading
          headingTag="h2"
          heading="Welfare regime"
          className="text-center"
        />
        {recruitmentWelfareRegimeData.length > 0 && (
          <ul className="flex flex-wrap -mx-[15px]">
            {recruitmentWelfareRegimeData?.map((item: any) => {
              return (
                <li
                  key={item?.id}
                  className="md:w-1/2 lg:w-1/3 px-[15px] mb-10"
                >
                  {item?.attributes && (
                    <div
                      className="flex flex-wrap items-center justify-center w-[88px] h-[88px] rounded-lg"
                      style={{ boxShadow: "var(--box-shadow)" }}
                    >
                      {item?.attributes?.Image && (
                        <Image
                          src={getImageURL(
                            item?.attributes?.Image?.data?.attributes?.url
                          )}
                          alt={
                            item?.attributes?.Image?.data?.attributes
                              ?.alternativeText || "Welfare Regime"
                          }
                          width={48}
                          height={48}
                        />
                      )}
                    </div>
                  )}
                  <h3 className="text-[18px] font-medium mt-7">
                    {item?.attributes?.Title}
                  </h3>
                  <div className="mt-3">
                    <Richtext richtextContent={item?.attributes?.Content} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </div>
  );
};

export default RecruitmentWelfareRegime;
