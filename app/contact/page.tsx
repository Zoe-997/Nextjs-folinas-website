import { callApi } from "@/app/apis";
import { getImageURL } from "@/app/libs/function";
import { constants as c } from "@/app/libs/constant";

import { BreadcrumbsItem } from "@/app/types";
import Breadcrumbs from "@/app/components/Header/Breadcrumbs";

import Container from "@/app/components/Commons/Container";
import ContactMainContent from "@/app/components/Sections/ContactMainContent";

import LogoImage from "@/public/images/logo.png";

export async function generateMetadata() {
  const fetchMeta = await callApi("/api/meta-tags?populate=*&locale=en", "get");

  const metaPage = await fetchMeta?.data?.data?.find(
    (item: any) => item?.attributes?.Page === "contact"
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

export default async function ContactPage() {
  const items: BreadcrumbsItem[] = [c.CONTACT_PAGE];

  return (
    <>
      <Breadcrumbs title={c.CONTACT_PAGE.title} items={items} />
      <Container>
        <ContactMainContent />
      </Container>
    </>
  );
}
