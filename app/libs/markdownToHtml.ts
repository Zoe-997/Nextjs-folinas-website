import { remark } from 'remark';
import html from 'remark-html';

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  let htmlContent = result.toString();

  // Regular expression to find all images and insert <em> tag after each
  htmlContent = htmlContent.replace(/<img src="([^"]+)" alt="([^"]*)"( title="([^"]*)")?>/g, (match, src, alt, _, title) => {
    const titleText = title || alt; // Use title if available, otherwise use alt
    return `${match}<em>${titleText}</em>`;
  });

  return htmlContent;
}