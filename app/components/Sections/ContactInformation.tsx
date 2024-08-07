"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { formatTime } from "@/app/libs/function";

const ContactInformation = ({ data, dataIcon }: any) => {
  const [dataContact, setDataContact] = useState<any>({});

  const dataMap = dataIcon.map((item: any) => {
    let processedContent = dataContact[item.title];

    if (item.title === "WorkingTime" && dataContact.Open) {
      processedContent = `<p>Mon-Sat: ${formatTime(data?.Open)} - ${formatTime(
        data?.Close
      )}</p><p style="color: rgb(var(--link-rgb))">Sun: Close</p>`;
    }

    return {
      icon: item.icon,
      isLink: item.isLink || false,
      linkPrefix: item.linkPrefix || null,
      title: item.title,
      content: processedContent,
    };
  });

  useEffect(() => {
    if (data) setDataContact(data);
  }, [data]);

  return (
    <ul>
      {dataMap?.map((item: any, index: number) => {
        return (
          <div key={index} className={`flex mb-3 last:mb-0`}>
            {item.icon && (
              <span className="mr-3 opacity-60">
                {" "}
                <item.icon size={20} />
              </span>
            )}
            {item.isLink && !Array.isArray(item?.content) ? (
              <Link
                href={`${item.linkPrefix}${item?.content}`}
                className="flex-1 inline-block"
              >
                {item?.content}
              </Link>
            ) : (
              <div
                className="flex-1"
                dangerouslySetInnerHTML={{ __html: item?.content }}
              ></div>
            )}
          </div>
        );
      })}
    </ul>
  );
};

export default ContactInformation;
