"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";
import { formatDateFromDate } from "@/app/libs/function";

import Container from "@/app/components/Commons/Container";
import Heading from "@/app/components/Commons/Heading";
import NoData from "@/app/components/Commons/NoData";
import RecruitmentSearch from "@/app/components/Sections/RecruitmentSearch";
import PageLoading from "@/app/components/Commons/PageLoading";

const Recruitment = () => {
  const [recruitmentData, setRecruitmentData] = useState<any>([]);
  const [recruitmentPreview, setRecruitmentPreview] = useState<any>();
  const [dataSearch, setDataSearch] = useState<any>();
  const { getRecruitmentItems, loading } = useCollectionTypesStores();

  const handleSearchSelected = (result: any) => {
    setDataSearch(result);
  };

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) {
        setRecruitmentData(res);
        setRecruitmentPreview(res);
      }
    };
    getRecruitmentItems(`?populate=*&locale=en`, onSuccess);
  }, [getRecruitmentItems]);

  useEffect(() => {
    if (recruitmentData.length > 0) {
      if (dataSearch !== -1) {
        const recruitmentPreviewSearch = recruitmentData?.filter(
          (item: any) =>
            item?.attributes?.WorkingForm?.data?.some(
              (searchValue: any) => searchValue.id === dataSearch.WorkingForm
            ) && item?.attributes?.Position?.data?.id === dataSearch.Position
        );

        setRecruitmentPreview(recruitmentPreviewSearch);
      } else {
        setRecruitmentPreview(recruitmentData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSearch]);

  return (
    <div>
      <div>
        <Heading
          headingTag="h2"
          heading="Recruitment and training"
          className="text-center"
        />
        <RecruitmentSearch searchSelected={handleSearchSelected} />
      </div>
      <Container>
        {!recruitmentPreview?.length && (
          <div className="p-5 border my-10">
            <NoData />
          </div>
        )}
        {loading && <PageLoading />}
        {recruitmentPreview?.length > 0 && (
          <ul className="flex flex-wrap -mx-[15px] mt-10 lg:mt-20 mb-20">
            {recruitmentPreview?.map((item: any) => {
              const currentDate: Date = new Date();
              const endDate: Date = new Date(item?.attributes?.EndTime);
              const timeDifference = endDate.getTime() - currentDate.getTime();
              const rangeTime = timeDifference / (1000 * 60 * 60 * 24);
              return (
                <li
                  key={item?.id}
                  className="md:w-6/12 lg:w-full lg:flex lg:flex-wrap lg:items-center px-5 lg:px-0 py-5 border-b-[1px] last:border-b-0"
                >
                  <div className="lg:w-5/12">
                    <p className="font-semibold">{item?.attributes?.Title}</p>
                    <p>
                      <span>
                        {formatDateFromDate(
                          item?.attributes?.StartTime,
                          "DD/MM/YYYY"
                        )}
                      </span>
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                      <span className="font-semibold text-[rgb(var(--second-rgb))]">
                        {rangeTime > 0 ? (
                          <>
                            {Math.round(rangeTime)}{" "}
                            {rangeTime > 1 ? "days" : "day"}
                          </>
                        ) : (
                          <>Out of date</>
                        )}
                      </span>
                    </p>
                  </div>
                  <div className="lg:w-3/12">{item?.attributes?.Salary}</div>
                  <div className="lg:w-3/12">
                    {item?.attributes?.Persons}{" "}
                    {Number(item?.attributes?.Persons) > 1
                      ? "people"
                      : "person"}
                  </div>
                  <div className="mt-5 lg:mt-0 lg:w-1/12">
                    <Link
                      href={{
                        pathname: `/recruitment/${item?.id}`,
                      }}
                      className={`text-xs rounded-full bg-[rgb(var(--btn-bg))] text-[rgb(var(--btn-text))] px-5 py-2 hover:bg-[rgb(var(--btn-bg-hv))] hover:text-[rgb(var(--btn-text-hv))]${
                        rangeTime > 0 ? "" : " opacity-75 pointer-events-none"
                      }`}
                    >
                      View detail
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </div>
  );
};

export default Recruitment;
