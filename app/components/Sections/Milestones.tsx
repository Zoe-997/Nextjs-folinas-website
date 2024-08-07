"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";

import { useSingleTypesStores } from "@/app/apis/stores/singleTypesStores";
import Container from "@/app/components/Commons/Container";
import { initialResponsive } from "@/app/libs/carousel";
import { getImageURL } from "@/app/libs/function";

import Heading from "@/app/components/Commons/Heading";
import Richtext from "@/app/components/Commons/RichText";
import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";
import BackgroundEllipse from "@/app/components/Sections/BackgroundEllipse";

import LogoImage from "@/public/images/logo.png";
import SectionLoading from "../Commons/SectionLoading";

interface MilestonesProps {}

const Milestones = ({}: MilestonesProps) => {
  const ref = useRef<any>(null);
  const [milestone, setMilestone] = useState<any>({});
  const [milestoneItems, setMilestoneItems] = useState<any>([]);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { getMilestone, loading } = useSingleTypesStores();
  const { getMilestoneItems, loadingCollection } = useCollectionTypesStores();
  const bgItems = [
    {
      width: 10,
      width_desktop: 20,
      top: 0,
      left: -2,
      bg: "linear-gradient(44.11deg, rgba(251, 137, 4, 0.6) 8.94%, rgba(255, 255, 255, 0) 86.73%)",
    },
    {
      width: 7,
      width_desktop: 10,
      right: 1,
      bottom: 1,
      bg: "linear-gradient(44.11deg, rgba(253, 178, 1, 0.6) 8.94%, rgba(255, 255, 255, 0) 86.73%)",
    },
  ];

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setMilestone(res);
    };

    const onSuccessItems = (res: any) => {
      if (res) setMilestoneItems(res);
    };

    getMilestone(`?populate=*&local=en`, onSuccess);
    getMilestoneItems(`?populate=*&local=en`, onSuccessItems);
  }, [getMilestone, getMilestoneItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const CustomDot = ({ onMove, index, onClick, active }: any) => {
    return (
      <>
        <li
          key={milestoneItems[index]?.id}
          className={`${
            active ? "active" : "inactive"
          } flex-1 text-center relative`}
        >
          <div className="w-full border bg-[rgb(var(--border))] absolute top-[50%] left-0 -translate-y-[50%]"></div>
          <div
            className={`z-[1] relative ${
              active ? "w-[56px] h-[56px]" : "w-[32px] h-[32px]"
            } overflow-hidden rounded-full transition-all duration-500 border border-1 border-[rgb(var(--border))] cursor-pointer mx-auto bg-white`}
            onClick={() => onClick()}
          >
            {milestoneItems[index]?.attributes?.ImageThumbNail && (
              <Image
                src={
                  getImageURL(
                    milestoneItems[index].attributes.ImageThumbNail?.data
                      .attributes.url
                  ) || LogoImage
                }
                alt={
                  milestoneItems[index].attributes.ImageThumbNail?.data
                    .attributes.alternativeText || "Milestones"
                }
                fill
                className="object-cover"
              />
            )}
          </div>
        </li>
      </>
    );
  };

  return (
    <div ref={ref} className="relative">
      {loading && loadingCollection && (
        <div className="min-h-[300px]">
          <SectionLoading />
        </div>
      )}
      {milestone && (
        <Container>
          {milestone.Title && (
            <Heading
              headingTag="h2"
              heading={milestone.Title}
              className={`${isIntersecting ? "animate__fadeInUp" : ""}`}
            />
          )}
          {milestone.Content && (
            <div>
              <Richtext richtextContent={milestone.Content} />
            </div>
          )}

          <div className="hidden md:block">
            {milestoneItems.length > 0 && (
              <Carousel
                className={`-mx-3 md:mx-0${
                  isIntersecting ? " animate__fadeInUp" : ""
                }`}
                arrows={false}
                autoPlay
                infinite={false}
                renderDotsOutside
                dotListClass={`milestones${
                  isIntersecting ? " animate__fadeInUp" : ""
                }`}
                responsive={initialResponsive}
                additionalTransfrom={0}
                autoPlaySpeed={5000}
                centerMode={false}
                draggable
                focusOnSelect={false}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                showDots
                sliderClass=""
                slidesToSlide={1}
                swipeable
                customDot={<CustomDot />}
              >
                {milestoneItems.map((milestone: any) => (
                  <div
                    key={milestone.id}
                    className="w-full md:w-[644px] px-3 md:px-0 md:py-10 mx-auto"
                  >
                    <div
                      className="md:h-[232px] flex flex-wrap rounded-lg overflow-hidden"
                      style={{ boxShadow: "var(--box-shadow)" }}
                    >
                      <div className="h-full w-full pb-[56.27%] md:pb-0 md:w-[45%] relative">
                        {milestone.attributes?.Image && (
                          <Image
                            src={
                              getImageURL(
                                milestone.attributes.Image?.data.attributes.url
                              ) || LogoImage
                            }
                            alt={
                              milestone.attributes.Image?.data.attributes
                                .alternativeText || "Milestones content"
                            }
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="w-full md:flex-1 px-5 md:px-10 py-5">
                        <Heading
                          heading={milestone.attributes.Title}
                          headingTag="h3"
                          className="!mb-3"
                        />
                        <div className="line-clamp-5 text-justify">
                          <Richtext
                            richtextContent={milestone.attributes.Content}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            )}
          </div>

          <div className="md:hidden">
            <ul className="list-none flex flex-col">
              {milestoneItems?.length > 0 &&
                milestoneItems?.map((item: any, index: number) => (
                  <li
                    key={index}
                    className="flex flex-wrap items-center py-5 relative"
                  >
                    <div
                      className={`${index === 0 ? "bottom-0" : "top-0"} ${
                        index === 0 || index === milestoneItems?.length - 1
                          ? "h-[50%]"
                          : "h-full"
                      } border bg-[rgb(var(--border))] absolute left-[28px]`}
                    ></div>
                    <div
                      className={`z-[1] relative w-[56px] h-[56px] overflow-hidden rounded-full transition-all duration-500 border border-1 border-[rgb(var(--border))] cursor-pointer mx-auto bg-white`}
                    >
                      {item?.attributes?.ImageThumbNail && (
                        <Image
                          src={
                            getImageURL(
                              item.attributes.ImageThumbNail?.data.attributes
                                .url
                            ) || LogoImage
                          }
                          alt={
                            item.attributes.ImageThumbNail?.data.attributes
                              .alternativeText || "Milestones content"
                          }
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 pl-10">
                      <Heading
                        heading={item.attributes.Title}
                        headingTag="h3"
                        className="!mb-1 text-base"
                      />
                      <div className="line-clamp-3 text-justify">
                        <Richtext richtextContent={item.attributes.Content} />
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </Container>
      )}
      <BackgroundEllipse activeBlock={isIntersecting} data={bgItems} />
    </div>
  );
};

export default Milestones;
