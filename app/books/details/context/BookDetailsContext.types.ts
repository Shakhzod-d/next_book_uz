import { TApiResponseStatus } from "@/hooks/useRequest/useRequest.types";

export interface IUseBookDetails {
  state: {
    getBookByIdState: {
      getBookByIdRes: any;
      getBookByIdStatus: TApiResponseStatus;
      getBookByIdError: any;
    };
    getCommentLstState: {
      getCommentListResponse: any;
      getCommentListStatus: TApiResponseStatus;
      getCommentListError: any;
    };
    addBookCommentState: {
      addBookCommentResponse: any;
      addBookCommentStatus: TApiResponseStatus;
      addBookCommentError: any;
    };
    getBooksByAuthorIdStates: {
      getBooksByAuthorIdData: any;
      getBooksByAuthorIdStatus: TApiResponseStatus;
      getBooksByAuthorIdError: any;
    };
    getUserCommentState: {
      getUserCommentsResponse: any;
      getUserCommentsStatus: TApiResponseStatus;
      getUserCommentsError: any;
    };
  };
  actions: {
    getBookById: (id: string) => void;
    getBookCommentList: (limit: number, bookId: string) => void;
    addBookComment: (AddBookCommentRequest: IAddBookCommentRequest) => void;
    getBooksByAuthorId: (
      limit: number,
      authorId: string,
      categoryId: string,
      bookId: string
    ) => void;
    getUserComments: (bookId: string) => void;
  };
}

export interface IAddBookCommentRequest {
  nickName: string;
  message: string;
  bookId: string;
  rating: number;
}
