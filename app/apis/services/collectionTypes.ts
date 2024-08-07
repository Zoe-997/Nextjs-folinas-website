import { callApi } from "@/app/apis/index";

const getMenu = (query: string) => {
  return callApi(`/api/menus${query}`, "get");
};

const getEcosystem = (query: string) => {
  return callApi(`/api/ecosystems${query}`, "get");
};

const getPartner = (query: string) => {
  return callApi(`/api/partner${query}`, "get");
};

const getPartnerItems = (query: string) => {
  return callApi(`/api/partner-items${query}`, "get");
};

const getMilestoneItems = (query: string) => {
  return callApi(`/api/milestone-items${query}`, "get");
};

const getSocials = () => {
  return callApi(`/api/socials`, "get");
};

const getServicesItems = (query: string) => {
  return callApi(`/api/our-services${query}`, "get");
};

const contactForm = (query: string, formData: any) => {
  return callApi(`/api/contact-forms${query}`, "post", formData);
};

const getRecruitmentItems = (query: string) => {
  return callApi(`/api/recruitments${query}`, "get");
};

const getRecruitmentPositions = (query: string) => {
  return callApi(`/api/recruitment-positions${query}`, "get");
};

const getRecruitmentWorkingForms = (query: string) => {
  return callApi(`/api/recruitment-working-forms${query}`, "get");
};

const getRecruitmentWelfareRegimes = (query: string) => {
  return callApi(`/api/recruitment-welfare-regimes${query}`, "get");
};

const getRecruitmentComments = (query: string) => {
  return callApi(`/api/recruitment-comments${query}`, "get");
};

const getRecruitmentDetail = (id: string, query: string) => {
  return callApi(`/api/recruitments/${id}${query}/`, "get");
};

const getRecruitmentForm = (formData: any) => {
  return callApi(`/api/recruitment-forms`, "post", formData);
};

const getBlogsItems = (query: string) => {
  return callApi(`/api/blogs${query}`, "get");
};

const getBlogsTags = (query: string) => {
  return callApi(`/api/blog-tags${query}`, "get");
};

const getBlogsCollections = (query: string) => {
  return callApi(`/api/blog-collections${query}`, "get");
};

const getBlogsDetail = (id: string, query: string) => {
  return callApi(`/api/blogs/${id}${query}`, "get");
};

const getBoardMember = (query: string) => {
  return callApi(`/api/board-members${query}`, "get");
};

const getKeySearch = (query: string) => {
  return callApi(`/api/search-keys${query}`, "get");
};

export const collectionTypes = {
  getMenu,
  getEcosystem,

  getPartner,
  getPartnerItems,
  getMilestoneItems,

  getSocials,

  getServicesItems,

  contactForm,

  getRecruitmentItems,
  getRecruitmentPositions,
  getRecruitmentWorkingForms,
  getRecruitmentWelfareRegimes,
  getRecruitmentComments,
  getRecruitmentDetail,
  getRecruitmentForm,

  getBlogsItems,
  getBlogsTags,
  getBlogsCollections,
  getBlogsDetail,

  getBoardMember,

  getKeySearch,
};
