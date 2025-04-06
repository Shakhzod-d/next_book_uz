import { useRequest } from "@/hooks/useRequest/useRequest";

export const useBookmarkList = () => {
  const [
    deleteBookmarkClient,
    deleteBookmarkResponse,
    deleteBookmarkStatus,
    deleteBookmarkError,
  ] = useRequest();

  const deleteBookmarkByApi = async (id: string) => {
    if (id) {
      await deleteBookmarkClient.deleteRequest(`bookmark/${id}`);
    }
  };

  return {
    state: {
      deleteBookMarkState: {
        deleteBookmarkResponse,
        deleteBookmarkStatus,
        deleteBookmarkError,
      },
    },
    actions: { deleteBookmarkByApi },
  };
};
