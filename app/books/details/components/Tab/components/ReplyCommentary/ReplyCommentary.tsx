"use client";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useTranslation } from "react-i18next";
import { ReplyCommentaryStyled } from "./ReplyCommentary.style";
import axios from "axios";
import { IReplyCommentary } from "./ReplyCommentary.types";
import { useContext } from "react";
import { LayoutContext } from "@/layout/context";
import { BookDetailsContext } from "@/app/books/details/context";
import { BOOK_COMMENT_LIST_LIMIT } from "../Commentary/Commentary.contants";

const ReplyCommentary: React.FC<IReplyCommentary> = ({
  bookId,
  replyId = null,
  parentId,
}) => {
  const { t } = useTranslation();
  const [isReply, setIsReply] = React.useState(false);
  const [value, setValue] = React.useState("");

  const {
    state: { isAuth },
    actions: { setAuthOpen },
  } = useContext(LayoutContext);

  const {
    state: {},
    actions: { getBookCommentList },
  } = useContext(BookDetailsContext);

  const toggle = () => {
    if (isAuth) {
      setIsReply((prev) => !prev);
    } else {
      setAuthOpen(true);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutation.mutate();
  };

  const calcelBtnClick = () => {
    setIsReply(false);
    setValue("");
  };

  const mutationFn = async () => {
    try {
      const response = await axios.post("book/comment", {
        bookId,
        replyId,
        message: value,
        parentId,
      });
      return response;
    } catch (err) {
      throw err;
    }
  };

  const mutation = useMutation({
    mutationKey: ["reply/comment", bookId, replyId, parentId],
    mutationFn: mutationFn,
    onSuccess: () => {
      setValue("");
      toggle();
      getBookCommentList(BOOK_COMMENT_LIST_LIMIT, bookId);
    },
    onError: () => {
      getBookCommentList(BOOK_COMMENT_LIST_LIMIT, bookId);
    },
  });

  return (
    <ReplyCommentaryStyled>
      {!isReply ? (
        <div className="reply-text pb-2" onClick={toggle}>
          {t("BOOK_DETAILS.REPLY_TEXT")}
        </div>
      ) : (
        <form className="reply-form" onSubmit={handleSubmit}>
          <label className="reply-label">{t("BOOK_DETAILS.YOUR_ANSWER")}</label>
          <input
            type="text"
            name="comment"
            className="reply-input"
            onChange={(event) => setValue(event.target.value)}
            value={value}
          />
          <div className="d-flex align-items-center py-2">
            <button type="submit" className="reply-save-btn me-3">
              {t("COMMON.SAVE")}
            </button>
            <button
              type="button"
              onClick={calcelBtnClick}
              className="reply-cancel-btn"
            >
              {t("COMMON.CANCEL")}
            </button>
          </div>
        </form>
      )}
    </ReplyCommentaryStyled>
  );
};

export default ReplyCommentary;
