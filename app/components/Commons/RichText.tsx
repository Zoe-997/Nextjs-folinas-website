import React, { Fragment } from "react";
import escapeHTML from "escape-html";
import { Text } from "slate";
import Link from "next/link";

interface RichtextProps {
  richtextContent: any;
}

const Richtext = ({ richtextContent }: RichtextProps) => {
  const getContent = (data: any) => {
    const result = data.map((item: any, index: number) => {
      let text = (
        <span dangerouslySetInnerHTML={{ __html: escapeHTML(item.text) }} />
      );

      if (item.type === "list-item") {
        text = (
          <li>
            <span
              dangerouslySetInnerHTML={{
                __html: escapeHTML(item.children[0].text),
              }}
            />
          </li>
        );
      }

      if (item.type === "link") {
        text = (
          <Link href={item.url}>
            {item.children[0].bold ? (
              <strong
                dangerouslySetInnerHTML={{
                  __html: escapeHTML(item.children[0].text),
                }}
              />
            ) : (
              <span
                dangerouslySetInnerHTML={{
                  __html: escapeHTML(item.children[0].text),
                }}
              />
            )}
          </Link>
        );
      }

      if (item.bold) {
        text = <strong key={index}>{text}</strong>;
      }

      if (item.code) {
        text = <code key={index}>{text}</code>;
      }

      if (item.italic) {
        text = <em key={index}>{text}</em>;
      }

      if (item.underline) {
        text = (
          <span style={{ textDecoration: "underline" }} key={index}>
            {text}
          </span>
        );
      }

      if (item.strikethrough) {
        text = (
          <span style={{ textDecoration: "line-through" }} key={index}>
            {text}
          </span>
        );
      }

      return <React.Fragment key={index}>{text}</React.Fragment>;
    });

    return result;
  };

  const result = richtextContent?.map((node: any, index: number) => {
    if (!node) return null;
    else {
      switch (node.type) {
        case "heading":
          return React.createElement(
            `h${node.level}`,
            { key: index, style: { marginBottom: "20px" } },
            getContent(node.children)
          );
        case "quote":
          return (
            <blockquote key={index}>{getContent(node.children)}</blockquote>
          );
        case "list":
          return (
            <ul key={index} className="pl-3" style={{ listStyle: "inside" }}>
              {getContent(node.children)}
            </ul>
          );
        case "ol":
          return <ol key={index}>{getContent(node.children)}</ol>;
        case "li":
          return <li key={index}>{getContent(node.children)}</li>;
        case "link":
          return (
            <a href={escapeHTML(node.url)} key={index}>
              {getContent(node.children)}
            </a>
          );

        case "paragraph":
          return (
            <p key={index} className="mb-5">
              {getContent(node.children)}
            </p>
          );

        case "label":
          return (
            <p key={index} className="mb-1">
              {getContent(node.children)}
            </p>
          );

        case "large-body": {
          return (
            <p key={index} className="mb-1">
              {getContent(node.children)}
            </p>
          );
        }

        default:
          return (
            <p key={index} className="mb-1">
              {getContent(node.children)}
            </p>
          );
      }
    }
  });

  return result;
};

export default Richtext;
