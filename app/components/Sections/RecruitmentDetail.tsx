"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";
import Input from "@/app/components/Commons/Input";
import Heading from "@/app/components/Commons/Heading";
import Modal from "@/app/components/Commons/Modal";
import Richtext from "@/app/components/Commons/RichText";
import SectionLoading from "@/app/components/Commons/SectionLoading";

interface FormData {
  data: {
    RecruitmentId: number;
    RecruitmentPosition: string;
    Name: string;
    Email: string;
    Phone: string;
    LinkCV: string;
    locale?: string;
  };
}

const RecruitmentDetail = () => {
  const params = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [recruitmentData, setRecruitmentData] = useState<any>({});
  const { getRecruitmentDetail, getRecruitmentForm, loading } =
    useCollectionTypesStores();

  const [formData, setFormData] = useState<FormData>({
    data: {
      Name: "",
      Email: "",
      Phone: "",
      LinkCV: "",
      RecruitmentId: Number(params.id),
      RecruitmentPosition: "",
    },
  });

  const modalTranslate = {
    title: "Apply for position",
    subtitle: "(Fields marked with * are required)",
    input: {
      item_1: "Your name*",
      item_2: "Your email*",
      item_3: "Your phone number*",
      item_4: "Your CV link*",
    },
    button: "Submit",
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      data: {
        ...prevData.data,
        RecruitmentPosition: recruitmentData?.attributes?.Title,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const onSuccess = (res: any) => {
      if (res) toast.success("Submit data success.");
      setOpenModal(false);
    };

    const onFail = (err: any) => {
      toast.error(err.response.data.error.message);
    };

    getRecruitmentForm(formData, onSuccess, onFail);
  };

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setRecruitmentData(res);
    };
    getRecruitmentDetail(`${params.id}`, `?populate=*&locale=en`, onSuccess);
  }, [getRecruitmentDetail, params]);

  const contentModal = (
    <form>
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-[48%]">
          <div className="mb-5">
            <Input
              type="text"
              id="Name"
              value={formData?.data?.Name}
              onChange={handleChange}
              placeholder={modalTranslate.input.item_1}
              required
              className="capitalize"
            />
          </div>

          <div>
            <Input
              type="Phone"
              id="Phone"
              value={formData?.data?.Phone}
              onChange={handleChange}
              placeholder={modalTranslate.input.item_3}
              required
            />
          </div>
        </div>
        <div className="w-full md:w-[48%]">
          <div className="mb-5">
            <Input
              type="Email"
              id="Email"
              value={formData?.data?.Email}
              onChange={handleChange}
              placeholder={modalTranslate.input.item_2}
              required
            />
          </div>
          <div>
            <Input
              type="LinkCV"
              id="LinkCV"
              value={formData?.data?.LinkCV}
              onChange={handleChange}
              placeholder={modalTranslate.input.item_4}
              required
            />
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <div>
      <Heading
        headingTag="h2"
        heading="Recruitment"
        className="text-center mb-0"
      />
      <Heading
        headingTag="h3"
        heading={recruitmentData?.attributes?.Title}
        className="text-center text-[rgb(var(--second-rgb))]"
      />
      <Richtext richtextContent={recruitmentData?.attributes?.Description} />
      <div className="text-center mt-10">
        <button
          onClick={() => setOpenModal(true)}
          className="relative text-sm rounded-full bg-[rgb(var(--btn-bg))] text-[rgb(var(--btn-text))] px-10 py-3 font-semibold hover:bg-[rgb(var(--btn-bg-hv))] hover:text-[rgb(var(--btn-text-hv))]"
        >
          Apply now
          {loading && <SectionLoading />}
        </button>
      </div>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        title={`${modalTranslate.title} ${recruitmentData?.attributes?.Title}`}
        subTitle={modalTranslate.subtitle}
        actionLabel={modalTranslate.button}
        body={contentModal}
        loading={loading}
      />
    </div>
  );
};

export default RecruitmentDetail;
