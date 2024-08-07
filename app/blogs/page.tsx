import { callApi } from "@/app/apis";
import { getImageURL } from "@/app/libs/function";
import { constants as c } from "@/app/libs/constant";

import Container from "@/app/components/Commons/Container";
import BlogContent from "@/app/components/Sections/BlogContent";

import { BreadcrumbsItem } from "@/app/types";
import Breadcrumbs from "@/app/components/Header/Breadcrumbs";

import LogoImage from "@/public/images/logo.png";

export async function generateMetadata() {
  const fetchMeta = await callApi("/api/meta-tags?populate=*&locale=en", "get");

  const metaPage = await fetchMeta?.data?.data?.find(
    (item: any) => item?.attributes?.Page === "blogs"
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

export default async function BlogsPage() {
  const items: BreadcrumbsItem[] = [c.BLOG_PAGE];

  return (
    <>
      <Breadcrumbs title={c.BLOG_PAGE.title} items={items} />
      <Container>
        <BlogContent />
      </Container>
    </>
  );
}
