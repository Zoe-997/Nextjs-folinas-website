"use client";
import { useEffect, useState } from "react";

import { useSingleTypesStores } from "@/app/apis/stores/singleTypesStores";
import ContactMap from "./ContactMap";
import ContactMethod from "./ContactMethod";

const ContactMainContent = () => {
  const [dataContact, setDataContact] = useState<any>({});
  const { getContactInformation } = useSingleTypesStores();

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setDataContact(res);
    };
    getContactInformation(`?populate=*&locale=en`, onSuccess);
  }, [getContactInformation]);

  return (
    <>
      <ContactMap data={dataContact?.GoogleMap} />
      <ContactMethod data={dataContact} />
    </>
  );
};

export default ContactMainContent;
