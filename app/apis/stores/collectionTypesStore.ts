import { create } from "zustand";
import { RepositoryRemote } from "../services";

interface collectionTypesStores {
  loading: boolean;
  loadingCollection: boolean;
  blogById: any;
  getMenu: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;
  getEcosystem: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;

  getPartner: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;
  getPartnerItems: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;
  getMilestoneItems: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;

  getSocials: (
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;

  getServicesItems: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;

  contactForm: (
    query: string,
    formData: any,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;

  getRecruitmentItems: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;
  getRecruitmentPositions: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;
  getRecruitmentWorkingForms: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;
  getRecruitmentWelfareRegimes: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;
  getRecruitmentComments: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;
  getRecruitmentDetail: (
    id: string,
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;
  getRecruitmentForm: (
    formData: any,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;

  getBlogsItems: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;
  getBlogsTags: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;
  getBlogsCollections: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;
  getBlogsDetail: (
    id: string,
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;

  getBoardMember: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;

  getKeySearch: (
    query: string,
    onSuccess?: (data: any) => void,
    onFail?: (data: any) => void
  ) => void;
}

export const useCollectionTypesStores = create<collectionTypesStores>(
  (set) => ({
    loading: false,
    loadingCollection: false,
    blogById: {},
    getMenu: async (query, onSuccess, onFail) => {
      try {
        set({ loading: true });
        const response = await RepositoryRemote.collectionTypes.getMenu(query);
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loading: false });
      }
    },
    getEcosystem: async (query, onSuccess, onFail) => {
      try {
        set({ loading: true });
        const response = await RepositoryRemote.collectionTypes.getEcosystem(
          query
        );
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loading: false });
      }
    },

    getPartner: async (query, onSuccess, onFail) => {
      try {
        set({ loading: true });
        const response = await RepositoryRemote.collectionTypes.getPartner(
          query
        );
        onSuccess?.(response?.data?.data?.attributes);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loading: false });
      }
    },
    getPartnerItems: async (query, onSuccess, onFail) => {
      try {
        set({ loading: true });
        const response = await RepositoryRemote.collectionTypes.getPartnerItems(
          query
        );
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loading: false });
      }
    },
    getMilestoneItems: async (query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response =
          await RepositoryRemote.collectionTypes.getMilestoneItems(query);
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },

    getSocials: async (onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response = await RepositoryRemote.collectionTypes.getSocials();
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },

    getServicesItems: async (query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response =
          await RepositoryRemote.collectionTypes.getServicesItems(query);
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },

    contactForm: async (query, formData, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response = await RepositoryRemote.collectionTypes.contactForm(
          query,
          formData
        );
        onSuccess?.(response);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },

    getRecruitmentItems: async (query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response =
          await RepositoryRemote.collectionTypes.getRecruitmentItems(query);
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },
    getRecruitmentPositions: async (query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response =
          await RepositoryRemote.collectionTypes.getRecruitmentPositions(query);
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },
    getRecruitmentWorkingForms: async (query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response =
          await RepositoryRemote.collectionTypes.getRecruitmentWorkingForms(
            query
          );
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },
    getRecruitmentWelfareRegimes: async (query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response =
          await RepositoryRemote.collectionTypes.getRecruitmentWelfareRegimes(
            query
          );
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },
    getRecruitmentComments: async (query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response =
          await RepositoryRemote.collectionTypes.getRecruitmentComments(query);
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },
    getRecruitmentDetail: async (id, query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response =
          await RepositoryRemote.collectionTypes.getRecruitmentDetail(
            id,
            query
          );
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },
    getRecruitmentForm: async (formData, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response =
          await RepositoryRemote.collectionTypes.getRecruitmentForm(formData);
        onSuccess?.(response);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },

    getBlogsItems: async (query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response = await RepositoryRemote.collectionTypes.getBlogsItems(
          query
        );
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },
    getBlogsTags: async (query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response = await RepositoryRemote.collectionTypes.getBlogsTags(
          query
        );
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },
    getBlogsCollections: async (query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response =
          await RepositoryRemote.collectionTypes.getBlogsCollections(query);
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },

    getBlogsDetail: async (id, query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response = await RepositoryRemote.collectionTypes.getBlogsDetail(
          id,
          query
        );
        onSuccess?.(response?.data?.data?.attributes);
        set({ blogById: response?.data?.data?.attributes });
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },

    getBoardMember: async (query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response = await RepositoryRemote.collectionTypes.getBoardMember(
          query
        );
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },

    getKeySearch: async (query, onSuccess, onFail) => {
      try {
        set({ loadingCollection: true });
        const response = await RepositoryRemote.collectionTypes.getKeySearch(
          query
        );
        onSuccess?.(response?.data?.data);
      } catch (error) {
        onFail?.(error);
      } finally {
        set({ loadingCollection: false });
      }
    },
  })
);
