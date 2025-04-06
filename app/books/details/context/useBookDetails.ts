import get from "lodash.get";
import React from "react";
import { useParams } from "react-router-dom";
import { BOOK_COMMENT_LIST_LIMIT } from "../components/Tab/components/Commentary/Commentary.contants";
import {
  IAddBookCommentRequest,
  IUseBookDetails,
} from "./BookDetailsContext.types";
import { useRequest } from "@/hooks/useRequest/useRequest";
import { axiosInstance } from "@/services/api/client";
import { usePathname } from "next/navigation";

export const useBookDetails = (): IUseBookDetails => {
  const { id } = useParams();
  const pathname = usePathname();

  const [
    getBookByIdClient,
    getBookByIdRes,
    getBookByIdStatus,
    getBookByIdError,
  ] = useRequest();
  const [
    getCommentListClient,
    getCommentListResponse,
    getCommentListStatus,
    getCommentListError,
  ] = useRequest();

  const [
    getUserCommentsClient,
    getUserCommentsResponse,
    getUserCommentsStatus,
    getUserCommentsError,
  ] = useRequest();

  const [
    addBookCommentClient,
    addBookCommentResponse,
    addBookCommentStatus,
    addBookCommentError,
  ] = useRequest();

  const [
    getBooksByAuthorIdClient,
    getBooksByAuthorIdData,
    getBooksByAuthorIdStatus,
    getBooksByAuthorIdError,
  ] = useRequest();

  const getBooksByAuthorId = (
    limit: number,
    authorId: string,
    categoryId: string,
    bookId: string
  ) => {
    const bookQuery = () => {
      if (!!bookId) {
        return `&bookId=${bookId}`;
      } else return "";
    };

    getBooksByAuthorIdClient.get(
      `book/same?page=1&limit=${limit}${bookQuery()}`
    );
  };

  const addBookComment = async (
    addBookCommentRequest: IAddBookCommentRequest
  ) => {
    await addBookCommentClient.post("book/comment", addBookCommentRequest);
    await getBookCommentList(
      BOOK_COMMENT_LIST_LIMIT,
      get(getBookByIdRes, "data._id")
    );
  };

  const baseUrl = React.useMemo(() => {
    return pathname.includes("/books")
      ? "book"
      : pathname.includes("/packages")
      ? "collection"
      : "";
  }, [pathname]);

  const getBookById = async () => {
    try {
      if (id) {
        const res = await axiosInstance.get(`${baseUrl}/${id}`);
        return res;
      }
    } catch (err) {
      throw err;
    }
  };

  const getBookCommentList = async (
    limit: number = BOOK_COMMENT_LIST_LIMIT,
    bookId: string = ""
  ) => {
    if (bookId)
      await getCommentListClient.get(
        `book/comment?page=1&limit=${limit}&bookId=${bookId}`
      );
  };

  const getUserComments = async (bookId: string = "") => {
    if (bookId)
      await getUserCommentsClient.get(`book/comment/mine?bookId=${bookId}`);
  };

  return {
    state: {
      getBookByIdState: {
        getBookByIdRes,
        getBookByIdStatus,
        getBookByIdError,
      },
      getCommentLstState: {
        getCommentListResponse,
        getCommentListStatus,
        getCommentListError,
      },
      addBookCommentState: {
        addBookCommentResponse,
        addBookCommentStatus,
        addBookCommentError,
      },
      getBooksByAuthorIdStates: {
        getBooksByAuthorIdData,
        getBooksByAuthorIdStatus,
        getBooksByAuthorIdError,
      },
      getUserCommentState: {
        getUserCommentsResponse,
        getUserCommentsStatus,
        getUserCommentsError,
      },
    },
    actions: {
      getBookById,
      getBookCommentList,
      addBookComment,
      getBooksByAuthorId,
      getUserComments,
    },
  };
};
