import { callApi } from "@/app/apis";
import { getImageURL } from "@/app/libs/function";
import { constants as c } from "@/app/libs/constant";

import Culture from "@/app/components/Sections/Culture";
import BoardMember from "@/app/components/Sections/BoardMember";
import BlogCarousel from "@/app/components/Sections/BlogCarousel";
import Partners from "@/app/components/Sections/Partners";
import Milestones from "@/app/components/Sections/Milestones";
import BannerTop from "@/app/components/Sections/BannerTop";

import LogoImage from "@/public/images/logo.png";

export async function generateMetadata() {
  const fetchMeta = await callApi("/api/meta-tags?populate=*&locale=en", "get");

  const metaHome = await fetchMeta?.data?.data?.find(
    (item: any) => item?.attributes?.Page === "home"
  );

  return {
    title: metaHome?.attributes?.Title,
    description: metaHome?.attributes?.Description || c.META_DESCRIPTION,
    openGraph: {
      images: [
        getImageURL(metaHome?.attributes?.Image?.data?.attributes?.url) ||
          LogoImage,
      ],
    },
  };
}

export default async function Home() {
  return (
    <>
      <BannerTop />
      <div className="pb-10 md:py-10">
        <Culture />
      </div>
      <div className="md:pt-10">
        <BoardMember />
      </div>
      <div className="pb-10 md:py-10">
        <BlogCarousel />
      </div>
      <div className="pb-10 md:py-10">
        <Partners />
      </div>
      <div className="md:py-10">
        <Milestones />
      </div>
    </>
  );
}
