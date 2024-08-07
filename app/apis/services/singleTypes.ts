import { callApi } from '@/app/apis/index';

const getBannerTop = (query: string) => {
  return callApi(`/api/banner-top${query}`, 'get');
};

const getBannerTopCarousel = (query: string) => {
  return callApi(`/api/banner-top-carousels${query}`, 'get');
};

const getCulture = (query: string) => {
  return callApi(`/api/culture${query}`, 'get');
}

const getCultureItems = (query: string) => {
  return callApi(`/api/culture-items${query}`, 'get');
}

const getHistory = (query: string) => {
  return callApi(`/api/history${query}`, 'get');
}

const getCorporateStructure = (query: string) => {
  return callApi(`/api/corporate-structure${query}`, 'get');
}

const getMilestone = (query: string) => {
  return callApi(`/api/milestone${query}`, 'get');
}

const getContactInformation = (query: string) => {
  return callApi(`/api/contact-information${query}`, 'get');
}

const getAboutInformation = (query: string) => {
  return callApi(`/api/about-introduction${query}`, 'get');
};

const getTalkingNumber = (query: string) => {
  return callApi(`/api/talking-number${query}`, 'get');
}

const getServiceIntroduction = (query: string) => {
  return callApi(`/api/services-introduction${query}`, 'get');
}

const getBreadCrumb = () => {
  return callApi(`/api/breadcrumb?populate=*`, 'get');
}

const getLogo = () => {
  return callApi(`/api/logo?populate=*`, 'get');
}

export const singleTypes = {
  getBannerTop,
  getBannerTopCarousel,

  getCulture,
  getCultureItems,

  getHistory,
  getCorporateStructure,
  getMilestone,

  getContactInformation,
  
  getAboutInformation,
  getTalkingNumber,

  getServiceIntroduction,

  getBreadCrumb,
  getLogo
};