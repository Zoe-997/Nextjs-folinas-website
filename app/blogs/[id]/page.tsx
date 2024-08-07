import { callApi } from "@/app/apis";
import { getImageURL } from "@/app/libs/function";
import { constants as c } from "@/app/libs/constant";

import { BreadcrumbsItem } from "@/app/types";
import Container from "@/app/components/Commons/Container";
import BlogDetail from "@/app/components/Sections/BlogDetail";
import Breadcrumbs from "@/app/components/Header/Breadcrumbs";

import LogoImage from "@/public/images/logo.png";

export async function generateStaticParams() {
  const blogs: any = await callApi("/api/blogs?populate=*&locale=en", "get");

  return blogs?.data?.data?.map((post: any) => ({
    id: post?.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const fetchMeta = await callApi(
    `/api/blogs/${params.id}?populate=*&locale=en`,
    "get"
  );

  return {
    title: fetchMeta?.data?.data?.attributes?.Title || c.META_TITLE,
    description:
      fetchMeta?.data?.data?.attributes?.Introduction || c.META_DESCRIPTION,
    openGraph: {
      images: [
        getImageURL(
          fetchMeta?.data?.data?.attributes?.Image?.data?.attributes?.url
        ) || LogoImage,
      ],
    },
  };
}

export default async function BlogsPageDetail({
  params,
}: {
  params: { id: string };
}) {
  const fetchMeta = await callApi(
    `/api/blogs/${params.id}?populate=*&locale=en`,
    "get"
  );
  console.log("params", params);

  const items: BreadcrumbsItem[] = [
    c.BLOG_PAGE,
    {
      title: fetchMeta?.data?.data?.attributes?.Title,
      link: `/blogs/${params.id}`,
    },
  ];

  return (
    <>
      <Breadcrumbs
        title={fetchMeta?.data?.data?.attributes?.Title}
        items={items}
      />
      <Container>
        <BlogDetail />
      </Container>
    </>
  );
}
