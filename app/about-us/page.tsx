import { callApi } from "@/app/apis";
import { getImageURL } from "@/app/libs/function";
import { constants as c } from "@/app/libs/constant";

import { BreadcrumbsItem } from "@/app/types";
import Breadcrumbs from "@/app/components/Header/Breadcrumbs";

import Container from "@/app/components/Commons/Container";
import AboutInformation from "@/app/components/Sections/AboutInformation";
import TalkingNumber from "@/app/components/Sections/TalkingNumber";
import History from "@/app/components/Sections/History";

import LogoImage from "@/public/images/logo.png";

export async function generateMetadata() {
  const fetchMeta = await callApi("/api/meta-tags?populate=*&locale=en", "get");

  const metaPage = await fetchMeta?.data?.data?.find(
    (item: any) => item?.attributes?.Page === "about-us"
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

export default async function AboutPage() {
  const items: BreadcrumbsItem[] = [c.ABOUT_PAGE];

  const talkingNumberItems = [
    "Years of establishment and development",
    "Staff",
    "Branch",
    "Partners worldwide",
  ];

  return (
    <>
      <Breadcrumbs title={c.ABOUT_PAGE.title} items={items} />
      <Container>
        <AboutInformation />
        <TalkingNumber talkingNumberItems={talkingNumberItems} />
        <div className="pb-10 md:py-10">
          <History />
        </div>
      </Container>
    </>
  );
}
