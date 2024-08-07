"use client";
import { useEffect, useState } from "react";

import { useSingleTypesStores } from "@/app/apis/stores/singleTypesStores";
import Container from "@/app/components/Commons/Container";
import SectionLoading from "@/app/components/Commons/SectionLoading";
import Heading from "@/app/components/Commons/Heading";
import Richtext from "@/app/components/Commons/RichText";

interface HistoryProps {}

const History = ({}: HistoryProps) => {
  const [history, setHistory] = useState<any>({});
  const { getHistory, loading } = useSingleTypesStores();

  useEffect(() => {
    const onSuccess = (res: any) => {
      if (res) setHistory(res);
    };

    getHistory(`?populate=*&local=en`, onSuccess);
  }, [getHistory]);

  return (
    <>
      {loading && (
        <div className="min-h-[300px]">
          <SectionLoading />
        </div>
      )}
      {history && (
        <Container>
          {history.Title && <Heading headingTag="h2" heading={history.Title} />}
          <div>
            <Richtext richtextContent={history.Content} />
          </div>
        </Container>
      )}
    </>
  );
};

export default History;
