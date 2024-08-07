"use client";
import { useState } from "react";
import Link from "next/link";

import Heading from "@/app/components/Commons/Heading";
import Drawer from "@/app/components/Commons/Drawer";
import ButtonModal from "@/app/components/Commons/ButtonModal";

interface ItemIcon {
  label: string;
  link?: string;
  target?: string;
  icon?: any;
}

interface ExtendObject {
  title: string;
  action?: string;
  items: ItemIcon[];
}

interface ExtendProps {
  dataLabel: ExtendObject[];
}

const Extend = ({ dataLabel }: ExtendProps) => {
  const [openExtend, setOpenExtend] = useState(false);

  const handleToggleExtendCanvas = (status: boolean) => {
    setOpenExtend(status);
    const htmlElement = document.getElementsByTagName("html")[0];
    if (status) htmlElement.classList.add("openModal");
    else htmlElement.classList.remove("openModal");
  };

  const handleToolAction = (key: string | undefined) => {
    if ((key = "DarkMode")) {
      console.log(key);
    }
  };

  const contentModal = (
    <>
      {dataLabel.map((data, dataIndex) => (
        <div className="mb-10 last:mb-0" key={dataIndex}>
          <Heading
            headingTag="h3"
            heading={data.title}
            className="text-base mb-5"
          />
          <ul className="">
            {data.items.map((item, index) => (
              <li key={index} className="mb-5 last:mb-0">
                {item.link ? (
                  <Link
                    href={`${item.link}`}
                    target={item.target ? item.target : "_parent"}
                    className="flex flex-wrap gap-2 items-center"
                  >
                    <span className="text-xl">
                      {item.icon && <item.icon />}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <p
                    className="flex flex-wrap gap-2 items-center cursor-pointer hover:text-[rgb(var(--link-rgb))]"
                    onClick={() => handleToolAction(data.action)}
                  >
                    <span className="text-xl">
                      {item.icon && <item.icon />}
                    </span>
                    <span>{item.label}</span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );

  return (
    <div className="leading-[1]">
      <ButtonModal
        onClick={() => handleToggleExtendCanvas(true)}
        isOpenModal={openExtend}
      />
      <Drawer
        heading="Our Environment"
        isOpen={openExtend}
        closeModal={() => handleToggleExtendCanvas(false)}
        content={contentModal}
      />
    </div>
  );
};

export default Extend;
