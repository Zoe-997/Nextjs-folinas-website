import { create } from 'zustand';
import { RepositoryRemote } from '../services';

interface singleTypesStores {
  loading: boolean;
  loadingItem: boolean;
  bannerTop: any;
  getBannerTop: (query: string, onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;
  getBannerTopCarousel: (query: string, onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;

  getCulture: (query: string, onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;
  getCultureItems: (query: string, onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;

  getHistory: (query: string, onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;
  getCorporateStructure: (query: string, onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;
  getMilestone: (query: string, onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;

  getContactInformation: (query: string, onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;

  getAboutInformation: (query: string, onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;
  getTalkingNumber: (query: string, onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;

  getServiceIntroduction: (query: string, onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;

  getBreadCrumb: (onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;
  getLogo: (onSuccess?: (data: any) => void, onFail?: (data: any) => void) => void;
}

export const useSingleTypesStores = create<singleTypesStores>((set)=>({
  loading: false,
  loadingItem: false,
  bannerTop: {},
  getBannerTop: async (query, onSuccess, onFail) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.singleTypes.getBannerTop(query);
      set({ bannerTop: response?.data?.data?.attributes });
      onSuccess?.(response?.data?.data?.attributes);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loading: false });
    }
  },
  getBannerTopCarousel: async (query, onSuccess, onFail) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.singleTypes.getBannerTopCarousel(query);
      set({ bannerTop: response?.data?.data });
      onSuccess?.(response?.data?.data);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loading: false });
    }
  },

  getCulture: async (query, onSuccess, onFail) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.singleTypes.getCulture(query);
      onSuccess?.(response?.data?.data);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loading: false });
    }
  },
  getCultureItems: async (query, onSuccess, onFail) => {
    try {
      set({ loadingItem: true });
      const response = await RepositoryRemote.singleTypes.getCultureItems(query);
      onSuccess?.(response?.data?.data);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loadingItem: false });
    }
  },

  getHistory: async (query, onSuccess, onFail) => {
    try {
      set({ loadingItem: true });
      const response = await RepositoryRemote.singleTypes.getHistory(query);
      onSuccess?.(response?.data?.data?.attributes);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loadingItem: false });
    }
  },

  getCorporateStructure: async (query, onSuccess, onFail) => {
    try {
      set({ loadingItem: true });
      const response = await RepositoryRemote.singleTypes.getCorporateStructure(query);
      onSuccess?.(response?.data?.data?.attributes);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loadingItem: false });
    }
  },

  getMilestone: async (query, onSuccess, onFail) => {
    try {
      set({ loadingItem: true });
      const response = await RepositoryRemote.singleTypes.getMilestone(query);
      onSuccess?.(response?.data?.data?.attributes);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loadingItem: false });
    }
  },

  getContactInformation: async (query, onSuccess, onFail) => {
    try {
      set({ loadingItem: true });
      const response = await RepositoryRemote.singleTypes.getContactInformation(query);
      onSuccess?.(response?.data?.data?.attributes);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loadingItem: false });
    }
  },

  getAboutInformation: async (query, onSuccess, onFail) => {
    try {
      set({ loading: true });
      const response = await RepositoryRemote.singleTypes.getAboutInformation(query);
      onSuccess?.(response?.data?.data?.attributes);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loading: false });
    }
  },
  getTalkingNumber: async (query, onSuccess, onFail) => {
    try {
      set({ loadingItem: true });
      const response = await RepositoryRemote.singleTypes.getTalkingNumber(query);
      onSuccess?.(response?.data?.data?.attributes);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loadingItem: false });
    }
  },

  getServiceIntroduction: async (query, onSuccess, onFail) => {
    try {
      set({ loadingItem: true });
      const response = await RepositoryRemote.singleTypes.getServiceIntroduction(query);
      onSuccess?.(response?.data?.data?.attributes);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loadingItem: false });
    }
  },

  getBreadCrumb: async (onSuccess, onFail) => {
    try {
      set({ loadingItem: true });
      const response = await RepositoryRemote.singleTypes.getBreadCrumb();
      onSuccess?.(response?.data?.data?.attributes);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loadingItem: false });
    }
  },
  
  getLogo: async (onSuccess, onFail) => {
    try {
      set({ loadingItem: true });
      const response = await RepositoryRemote.singleTypes.getLogo();
      onSuccess?.(response?.data?.data?.attributes);
    } catch (error) {
      onFail?.(error);
    } finally {
      set({ loadingItem: false });
    }
  },
}));
