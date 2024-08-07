"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { useCollectionTypesStores } from "@/app/apis/stores/collectionTypesStore";
import Input from "@/app/components/Commons/Input";
import SectionLoading from "@/app/components/Commons/SectionLoading";

const ContactForm = () => {
  const { contactForm, loading } = useCollectionTypesStores();
  const dataInit = {
    data: {
      Name: "",
      Email: "",
      Phone: "",
      Message: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "",
            },
          ],
        },
      ],
      locale: "en",
    },
  };
  const [formData, setFormData] = useState(dataInit);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    let valueInput = value;
    if (name === "Message") {
      valueInput = [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: value,
            },
          ],
        },
      ];
    }

    setFormData((prevData) => ({
      data: {
        ...prevData.data,
        [name]: valueInput,
      },
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("formData: ", formData);
    const onSuccess = (res: any) => {
      if (res) {
        toast.success("Submit success");
        setFormData(dataInit);
      }
    };

    const onFail = (err: any) => {
      toast.success(err);
    };
    contactForm(`?locale=en`, formData, onSuccess, onFail);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-5">
          <Input
            type="text"
            id="Name"
            value={formData.data.Name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="capitalize"
          />
        </div>

        <div className="mb-5">
          <Input
            type="email"
            id="Email"
            value={formData.data.Email}
            onChange={handleChange}
            placeholder="Your email"
            required
          />
        </div>

        <div className="mb-5">
          <Input
            type="tel"
            id="Phone"
            value={formData.data.Phone}
            onChange={handleChange}
            placeholder="Your phone number"
            pattern="(+[0-9]{2})[0-9]{10}"
            max={15}
          />
        </div>

        <div className="mb-5">
          <textarea
            id="message"
            name="Message"
            value={formData.data.Message[0].children[0].text}
            onChange={handleChange}
            className="appearance-none border rounded-sm w-full py-2 px-3 leading-tight focus:outline-none focus:border-[rgb(var(--second-rgb))]"
            placeholder="Your comment or feedback about us"
            cols={5}
            rows={3}
            required
          ></textarea>
        </div>

        <div className="flex items-center justify-between w-full">
          <button
            type="submit"
            className="relative flex flex-wrap items-center justify-center gap-2 text-[rgb(var(--btn-text))] bg-[rgb(var(--btn-bg))] hover:text-[rgb(var(--btn-text-hv))] hover:bg-[rgb(var(--btn-bg-hv))] py-2 px-4 rounded-sm focus:outline-none focus:shadow-outline w-full"
          >
            Submit
            {loading && <SectionLoading />}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
