"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsTelephoneFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Carousel from "react-multi-carousel";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";
import { getImageURL } from "@/app/libs/function";

import Container from "@/app/components/Commons/Container";
import Heading from "@/app/components/Commons/Heading";

interface BoardMemberProps {}

const BoardMember = ({}: BoardMemberProps) => {
  const [members, setMembers] = useState<any>([]);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { getBoardMember } = useCollectionTypesStores();
  const ref = useRef<any>(null);

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) {
        const result = res.sort(
          (a: any, b: any) =>
            a.attributes.member_position.data.attributes.Level -
            b.attributes.member_position.data.attributes.Level
        );
        setMembers(result);
      }
    };

    getBoardMember(`?populate=*&locale=en`, onSuccess);
  }, [getBoardMember]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full">
      <Container>
        <Heading
          headingTag="h2"
          heading="Board member"
          className={`${isIntersecting ? "animate__fadeInUp" : ""}`}
        />
        <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
          {members?.map((item: any, index: number) => (
            <div
              key={item.id}
              className={`mb-10 md:mb-20 ${
                index === 0 && "col-span-2 md:col-span-3"
              } ${index === 1 && "col-span-1 md:col-span-3"} ${
                index !== 0 && index !== 1 && "col-span-1 md:col-span-2"
              } text-center${isIntersecting ? " animate__fadeInUp" : ""}`}
            >
              {item?.attributes?.Avartar?.data?.attributes && (
                <div
                  className={`relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden border-4 border-solid ${
                    index % 2 === 0
                      ? "border-[rgb(var(--link-rgb))]"
                      : "border-[black]"
                  } inline-block`}
                >
                  <Image
                    src={getImageURL(
                      item?.attributes?.Avartar?.data?.attributes?.url
                    )}
                    alt={
                      item?.attributes?.Avartar?.data?.attributes
                        ?.alternativeText || "Manager"
                    }
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="w-full max-w-[25rem] mx-auto">
                <Heading
                  headingTag="h4"
                  heading={item?.attributes?.Name}
                  className="!mb-0 mt-3"
                />
                <i>
                  {item.attributes.member_position.data.attributes.Position}
                </i>
                <div className="my-3">{item.attributes.Quote}</div>
                <ul className="flex flex-wrap items-center justify-center gap-5 mt-3">
                  <li>
                    <Link href={`tel: ${item?.attributes?.Phone}` || "#"}>
                      <BsTelephoneFill size={18} />
                    </Link>
                  </li>
                  <li>
                    <Link href={`mailto: ${item?.attributes?.Email}` || "#"}>
                      <MdEmail size={22} />
                    </Link>
                  </li>
                  <li>
                    <Link href={item?.attributes?.Facebook || "#"}>
                      <FaFacebook size={20} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BoardMember;
