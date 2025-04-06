"use client";

import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import get from "lodash.get";
import InfiniteScroll from "react-infinite-scroll-component";

import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import { BookReviewStyled } from "./Commentary.style";
import { CommentCard, DataNotFound, InfiniteScrollLoader } from "@/components";
import { BookDetailsContext } from "../../../../context";
import { BOOK_COMMENT_LIST_LIMIT } from "./Commentary.contants";
import { IComment } from "@/components/common/CommentCard/Comment.types";
import { ICommentary } from "./Commentary.types";
import ReplyCommentary from "../ReplyCommentary/ReplyCommentary";

const InfiniteScrollComponent = InfiniteScroll as any;

const Commentary: React.FC<ICommentary> = ({ bookId }) => {
  const { t } = useTranslation();
  const [limit, setLimit] = useState(BOOK_COMMENT_LIST_LIMIT);
  const [activeComment, setActiveComment] = useState<IComment>({
    message: "",
    rating: 0,
    user: {
      firstName: "",
      lastName: "",
    },
  });

  const {
    state: {
      getCommentLstState: { getCommentListResponse, getCommentListStatus },
      getUserCommentState: { getUserCommentsResponse, getUserCommentsStatus },
      addBookCommentState: { addBookCommentStatus },
    },
    actions: { getBookCommentList, getUserComments },
  } = useContext(BookDetailsContext);

  useEffect(() => {
    if (bookId) {
      // getUserComments(bookId);
      getBookCommentList(BOOK_COMMENT_LIST_LIMIT, bookId);
    }
  }, [bookId]);

  useEffect(() => {
    if (addBookCommentStatus === REQUEST_STATUS.success) {
      // getUserComments(bookId);
    }
  }, [addBookCommentStatus]);

  const fetchMoreData = () => {
    setLimit((prev) => prev + BOOK_COMMENT_LIST_LIMIT);
    getBookCommentList(limit + BOOK_COMMENT_LIST_LIMIT, bookId);
  };

  if (!get(getCommentListResponse, "data.data.length"))
    return <DataNotFound title="BOOK_DETAILS.NO_COMMENTS" />;

  return (
    <BookReviewStyled className=" mt-4 mb-3 ps-3 pr-0 py-3 ">
      <h2 className="font-500 title">{t("DETAILS.REVIEW")}</h2>
      <div className="infiniteScrollComment mb-4" id="infiniteScrollComment">
        {get(getCommentListResponse, "data.data", []).length > 0 ? (
          <InfiniteScrollComponent
            className="overflow-hidden"
            dataLength={
              getCommentListStatus === REQUEST_STATUS.success
                ? get(getCommentListResponse, "data.data")?.length
                : 0
            }
            next={fetchMoreData}
            hasMore={
              getCommentListStatus === REQUEST_STATUS.success
                ? get(getCommentListResponse, "data.data")?.length !==
                  get(getCommentListResponse, "data.total")
                : false
            }
            loader={
              getCommentListStatus === REQUEST_STATUS.loading && (
                <InfiniteScrollLoader />
              )
            }
            scrollableTarget="infiniteScrollComment"
          >
            {get(getUserCommentsResponse, "data.message") && (
              <div
                className="commentItem"
                onClick={() =>
                  setActiveComment(get(getUserCommentsResponse, "data"))
                }
                key={get(get(getUserCommentsResponse, "data"), "_id")}
              >
                <CommentCard
                  comment={get(getUserCommentsResponse, "data")}
                  bookId={bookId}
                />
              </div>
            )}

            {/* {get(getCommentListResponse, "data.data", []).map(
              (comment: IComment) => {
                return (
                  <div
                    className="commentItem"
                    onClick={() => setActiveComment(comment)}
                    key={get(comment, "_id")}
                  >
                    <CommentCard comment={comment} bookId={bookId} />
                  </div>
                );
              }
            )} */}
          </InfiniteScrollComponent>
        ) : (
          <></>
        )}
      </div>
    </BookReviewStyled>
  );
};

export default Commentary;
