import { callApi } from "@/app/apis";
import { getImageURL } from "@/app/libs/function";
import { constants as c } from "@/app/libs/constant";

import { BreadcrumbsItem } from "@/app/types";
import Breadcrumbs from "@/app/components/Header/Breadcrumbs";
import Recruitment from "@/app/components/Sections/Recruitment";
import RecruitmentWelfareRegime from "@/app/components/Sections/RecruitmentWelfareRegime";
import RecruitmentComment from "@/app/components/Sections/RecruitmentComment";

import LogoImage from "@/public/images/logo.png";

export async function generateMetadata() {
  const fetchMeta = await callApi("/api/meta-tags?populate=*&locale=en", "get");

  const metaPage = await fetchMeta?.data?.data?.find(
    (item: any) => item?.attributes?.Page === "recruitment"
  );

  return {
    title: metaPage?.attributes?.Title || c.META_TITLE,
    description: metaPage?.attributes?.Description || c.META_DESCRIPTION,
    openGraph: {
      images: [
        getImageURL(metaPage?.attributes?.Image?.data?.attributes?.url) ||
          LogoImage,
      ],
    },
  };
}

export default async function RecruitmentPage() {
  const items: BreadcrumbsItem[] = [c.RECRUITMENT_PAGE];

  return (
    <>
      <Breadcrumbs title={c.RECRUITMENT_PAGE.title} items={items} />
      <Recruitment />
      <RecruitmentWelfareRegime />
      <RecruitmentComment />
    </>
  );
}
