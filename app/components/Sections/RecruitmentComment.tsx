"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";
import { getImageURL } from "@/app/libs/function";

import Container from "@/app/components/Commons/Container";
import Heading from "@/app/components/Commons/Heading";
import Richtext from "@/app/components/Commons/RichText";
import Carousel from "react-multi-carousel";

const RecruitmentComment = () => {
  const [recruitmentCommentData, setRecruitmentCommentData] = useState<any>([]);
  const { getRecruitmentComments } = useCollectionTypesStores();
  const commentResponsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setRecruitmentCommentData(res);
    };
    getRecruitmentComments(`?populate=*&locale=en`, onSuccess);
  }, [getRecruitmentComments]);

  return (
    <div className="pt-20 md:pt-[80px] pb-10">
      <Container>
        <div className="text-center">
          <Heading
            headingTag="h2"
            heading="Shared from “Folinas people”"
            className="!mb-0"
          />
          <p>
            A dynamic environment at Folinas always has good values ​​that bring
            fun and happy working days.
          </p>
        </div>
        {recruitmentCommentData.length > 0 && (
          <div className="mt-10">
            <Carousel
              responsive={commentResponsive}
              arrows={false}
              renderDotsOutside
              showDots
              autoPlay
            >
              {recruitmentCommentData?.map((item: any) => {
                return (
                  <div key={item?.id} className="text-center py-5 px-3">
                    <div className="p-10 rounded-md h-full shadow-[5px_5px_17px_0px_rgba(0,_0,_0,_0.1)]">
                      {item?.attributes && (
                        <div
                          className="rounded-full w-[70px] h-[70px] mx-auto relative overflow-hidden inline-block mb-5"
                          style={{ boxShadow: "var(--box-shadow)" }}
                        >
                          {item?.attributes?.Avatar && (
                            <Image
                              src={getImageURL(
                                item?.attributes?.Avatar?.data?.attributes?.url
                              )}
                              alt={
                                item?.attributes?.Avatar?.data?.attributes
                                  ?.alternativeText || "Welfare Regime"
                              }
                              fill
                            />
                          )}
                        </div>
                      )}
                      <div className="line-clamp-4 h-[7rem]">
                        <Richtext richtextContent={item?.attributes?.Comment} />
                      </div>
                      <div className="mt-5">
                        <p className="text-[13px] uppercase text-[rgb(var(--second-rgb))]">
                          {item?.attributes?.Name}
                        </p>
                        <p>
                          {item?.attributes?.Position?.data?.attributes?.Title}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        )}
      </Container>
    </div>
  );
};

export default RecruitmentComment;
