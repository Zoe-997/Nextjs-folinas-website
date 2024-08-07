"use client";
import Link from "next/link";

const ContactMap = ({ data }: { data: string }) => {
  return (
    <div className="lg:mt-10 xl:mt-20 mb-10 w-full">
      <div
        className="h-[300px] lg:h-[500px] *:w-full *:h-full"
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
    </div>
  );
};

export default ContactMap;
