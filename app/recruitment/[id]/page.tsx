import { callApi } from "@/app/apis";
import { getImageURL } from "@/app/libs/function";
import { constants as c } from "@/app/libs/constant";

import { BreadcrumbsItem } from "@/app/types";
import Container from "@/app/components/Commons/Container";
import RecruitmentDetail from "@/app/components/Sections/RecruitmentDetail";
import Breadcrumbs from "@/app/components/Header/Breadcrumbs";

import LogoImage from "@/public/images/logo.png";

export async function generateStaticParams() {
  const blogs: any = await callApi(
    "/api/recruitments?populate=*&locale=en",
    "get"
  );

  return blogs?.data?.data?.map((post: any) => ({
    id: post?.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const fetchMeta = await callApi(
    `/api/recruitments/${params.id}?populate=*&locale=en`,
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
    `/api/recruitments/${params.id}?populate=*&locale=en`,
    "get"
  );

  const items: BreadcrumbsItem[] = [
    c.RECRUITMENT_PAGE,
    {
      title: fetchMeta?.data?.data?.attributes?.Title,
      link: `/recruitments/${params.id}`,
    },
  ];

  return (
    <>
      <Breadcrumbs
        title={fetchMeta?.data?.data?.attributes?.Title}
        items={items}
      />
      <Container>
        <RecruitmentDetail />
      </Container>
    </>
  );
}
