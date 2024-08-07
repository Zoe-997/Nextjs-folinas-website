let API_URL: string | undefined = "";
let API_TOKEN: string | undefined = "";
const META_TITLE = "Folinas LLC";
const META_DESCRIPTION =
  "Our team takes immense pride in our capacity to transform concepts into distinct and polished designs";
const ABOUT_PAGE = {
  title: "About us",
  link: "/about-us",
};

const SERVICE_PAGE = {
  title: "Our services",
  link: "/our-services",
};

const CONTACT_PAGE = {
  title: "Contact",
  link: "/contact",
};

const RECRUITMENT_PAGE = {
  title: "Recruitment",
  link: "/recruitment",
};

const BLOG_PAGE = {
  title: "Blogs",
  link: "/blog",
};

if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
  API_URL = process.env.NEXT_PUBLIC_API_DEV;
  API_TOKEN = process.env.NEXT_PUBLIC_TOKEN_BACKEND_DEV;
} else if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
  API_URL = process.env.NEXT_PUBLIC_API_PRODUCTION;
  API_TOKEN = process.env.NEXT_PUBLIC_TOKEN_BACKEND_PRODUCTION;
}

export const constants = {
  API_URL,
  API_TOKEN,
  META_TITLE,
  META_DESCRIPTION,

  ABOUT_PAGE,
  SERVICE_PAGE,
  CONTACT_PAGE,
  RECRUITMENT_PAGE,
  BLOG_PAGE,
};
