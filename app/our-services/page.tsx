import { callApi } from "@/app/apis";
import { getImageURL } from "@/app/libs/function";
import { constants as c } from "@/app/libs/constant";

import { BreadcrumbsItem } from "@/app/types";
import Breadcrumbs from "@/app/components/Header/Breadcrumbs";

import Container from "@/app/components/Commons/Container";
import IntroductionServices from "@/app/components/Sections/IntroductionServices";
import OurServices from "@/app/components/Sections/OurServices";

import LogoImage from "@/public/images/logo.png";

export async function generateMetadata() {
  const fetchMeta = await callApi("/api/meta-tags?populate=*&locale=en", "get");

  const metaPage = await fetchMeta?.data?.data?.find(
    (item: any) => item?.attributes?.Page === "our-services"
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

export default async function ServicesPage() {
  const items: BreadcrumbsItem[] = [c.SERVICE_PAGE];

  return (
    <>
      <Breadcrumbs title={c.SERVICE_PAGE.title} items={items} />
      <Container>
        <IntroductionServices />
        <OurServices heading="Our Services" />
      </Container>
    </>
  );
}
