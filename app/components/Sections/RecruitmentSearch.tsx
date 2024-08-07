"use client";
import { useEffect, useState } from "react";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";

import Container from "@/app/components/Commons/Container";
import SelectOption from "@/app/components/Commons/SelectOption";
import Button from "@/app/components/Commons/Button";

interface RecruitmentProp {
  searchSelected: any;
}

const RecruitmentSearch = ({ searchSelected }: RecruitmentProp) => {
  const [recruitmentPosition, setRecruitmentPosition] = useState<any>();
  const [recruitmentWorkingForm, setRecruitmentWorkingForm] = useState<any>();
  const { getRecruitmentPositions, getRecruitmentWorkingForms } =
    useCollectionTypesStores();
  const [dataSelected, setDataSelected] = useState<any>({
    Position: -1,
    WorkingForm: -1,
  });

  const handleSelected = (option: number, name: string) => {
    setDataSelected((prev: any) => ({
      ...prev,
      [name]: option,
    }));
  };

  const handleSearch = () => {
    searchSelected(dataSelected);
  };

  const handleSearchReset = () => {
    searchSelected(-1);
  };

  useEffect(() => {
    const onSuccessPosition = (res: any) => {
      if (res) {
        const dataPosition = res.map((item: any) => ({
          id: item.id,
          title: item?.attributes?.Title,
        }));
        setRecruitmentPosition(dataPosition);
      }
    };

    const onSuccessWorkingForm = (res: any) => {
      if (res) {
        const dataWorkingForm = res.map((item: any) => ({
          id: item.id,
          title: item?.attributes?.Title,
        }));
        setRecruitmentWorkingForm(dataWorkingForm);
      }
    };

    getRecruitmentPositions(`?locale=en`, onSuccessPosition);
    getRecruitmentWorkingForms(`?locale=en`, onSuccessWorkingForm);
  }, [getRecruitmentPositions, getRecruitmentWorkingForms]);

  return (
    <Container>
      <div className="mx-auto max-w-[950px]">
        <div className="flex flex-wrap items-center justify-center -mx-1 lg:-mx-3 ">
          <div className="w-full md:w-6/12 px-1 lg:px-3 mb-3 lg:mb-0 lg:flex-1">
            <SelectOption
              name="Position"
              label="Select the position"
              options={recruitmentPosition}
              optionSelected={handleSelected}
            />
          </div>
          <div className="w-full md:w-6/12 px-1 lg:px-3 mb-3 lg:mb-0 lg:flex-1">
            <SelectOption
              name="WorkingForm"
              label="Select the working form"
              options={recruitmentWorkingForm}
              optionSelected={handleSelected}
            />
          </div>
          <div className="lg:min-w-[100px] px-1 lg:px-3">
            <Button
              label="Search"
              onClick={handleSearch}
              medium
              className="!rounded-full px-5"
            />
          </div>
          <div className="lg:min-w-[100px] px-1 lg:px-3">
            <Button
              label="Reset"
              onClick={handleSearchReset}
              medium
              className="!rounded-full px-5"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RecruitmentSearch;
