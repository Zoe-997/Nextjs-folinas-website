import React, { useState, useEffect } from 'react';
import { markdownToHtml } from '@/app/libs/markdownToHtml';

type Props = {
  markdownContent: string;
};

const Markdown = ({ markdownContent }: Props) => {
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    const convertMarkdown = async () => {
      const html = await markdownToHtml(markdownContent);
      setHtmlContent(html);
    };

    convertMarkdown();
  }, [markdownContent]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default Markdown;
