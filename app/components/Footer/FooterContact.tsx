"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaClock, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { formatTime } from "@/app/libs/function";

import Heading from "../Commons/Heading";

interface FooterContactProps {
  data: any;
  heading: string;
  isShowOpenTime?: boolean;
  showContactInformation?: boolean;
  showIcon?: boolean;
}

const FooterContact = ({
  data,
  heading,
  isShowOpenTime,
  showContactInformation,
  showIcon,
}: FooterContactProps) => {
  const [contactData, setContactData] = useState<any>([]);
  useEffect(() => {
    if (showContactInformation) {
      setContactData([
        {
          icon: FaPhoneAlt,
          content: data?.Phone,
          link: { pathname: `tel: ${data?.Phone}` },
        },
        {
          icon: MdEmail,
          content: data?.Email,
          link: { pathname: `mailto: ${data?.Email}` },
        },
        {
          icon: FaMapMarkerAlt,
          content: data?.Address,
        },
      ]);
    }
  }, [showContactInformation, data]);

  useEffect(() => {
    if (isShowOpenTime) {
      setContactData([
        {
          icon: FaClock,
          content: `<span>Mon-Sat: ${formatTime(data?.Open)} - ${formatTime(
            data?.Close
          )}</span><span style="color: rgb(var(--link-rgb))">Sun: Off</span>`,
        },
      ]);
    }
  }, [isShowOpenTime, data]);

  return (
    <div className="mt-[29px]">
      <Heading headingTag="h4" heading={heading} />
      <ul>
        {contactData?.map((item: any, index: number) => (
          <li key={index} className={`flex mb-2 last:mb-0`}>
            {showIcon && (
              <span className="mr-3 opacity-60">
                <item.icon size={20} />
              </span>
            )}
            {item.link ? (
              <Link href={item.link} className="flex-1 inline-block">
                <span dangerouslySetInnerHTML={{ __html: item.content }}></span>
              </Link>
            ) : (
              <p
                className="flex-1 *:block"
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterContact;
