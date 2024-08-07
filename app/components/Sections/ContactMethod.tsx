"use client";
import { FaMapMarkerAlt, FaClock, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import Heading from "@/app/components/Commons/Heading";
import Social from "@/app/components/Commons/Social";
import ContactInformation from "./ContactInformation";
import ContactForm from "./ContactForm";

const ContactMethod = ({ data }: any) => {
  const contactDataIcon = [
    {
      icon: FaMapMarkerAlt,
      title: "Address",
    },
    {
      icon: MdEmail,
      title: "Email",
      isLink: true,
      linkPrefix: "mailto: ",
    },
    {
      icon: FaPhoneAlt,
      title: "Phone",
      isLink: true,
      linkPrefix: "tel: ",
    },
    {
      icon: FaClock,
      title: "WorkingTime",
    },
  ];

  return (
    <div className="flex flex-wrap gap-10">
      <div className="w-full lg:w-[50%] mb-10 lg:mb-0">
        <Heading
          heading="Contact information"
          headingTag="h2"
          className="md:text-[34px]"
        />
        <ContactInformation data={data} dataIcon={contactDataIcon} />
        <div className="mt-10">
          <Heading
            heading="Chat with us"
            headingTag="h2"
            className="md:text-[34px]"
          />
          <Social />
        </div>
      </div>

      <div className="w-full lg:flex-1">
        <Heading
          heading="Get in touch with us"
          headingTag="h2"
          className="md:text-[34px]"
        />
        <p className="mb-5">
          If you have any questions, please don’t hesitate to send us a message.
          We will reply to you as soon as possible.
        </p>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactMethod;
