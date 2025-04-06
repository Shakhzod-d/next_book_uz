import { Rating } from "@mui/material";
import React, { FC } from "react";
import get from "lodash.get";
import { CommentCardContent, CommentCardStyled } from "./CommentCard.style";
import { ICommentCardProps } from "./Comment.types";
import { dateCovert } from "@/services/dateConvert/dateCovert";
import ReplyCommentary from "@/app/books/details/components/Tab/components/ReplyCommentary/ReplyCommentary";

const CommentCard: FC<ICommentCardProps> = ({ comment, bookId }) => {
  const strCheck = (str: string | null | undefined) => {
    if (!!str) return str;
    return "";
  };

  return (
    <CommentCardContent className="comment-container">
      <CommentCardStyled className="mb-1 pt-2">
        <div className="userName mb-1">
          {strCheck(get(comment, "user.firstName", "")) +
            " " +
            strCheck(get(comment, "user.lastName", ""))}
        </div>
        <div className="rating d-flex my-1">
          <Rating
            name=""
            value={get(comment, "rating", 0)}
            precision={0.5}
            size="small"
            readOnly
          />
          <time>{dateCovert(get(comment, "createdAt"))}</time>
        </div>
        <p className="message">{strCheck(get(comment, "message", ""))}</p>
      </CommentCardStyled>
      <ReplyCommentary {...{ bookId, parentId: comment?._id }} />
      {!!get(comment, "reply") && (
        <>
          {get(comment, "reply", []).map((replyComment) => (
            <>
              <CommentCardStyled className="mb-3 replyMessage">
                <div className="userName">
                  {strCheck(get(replyComment, "user.firstName", "")) +
                    " " +
                    strCheck(get(replyComment, "user.lastName", ""))}
                </div>

                <p className="message">
                  {strCheck(get(replyComment, "message", ""))}
                </p>
              </CommentCardStyled>
              <div className="replyMessage">
                <ReplyCommentary
                  {...{
                    bookId,
                    parentId: comment?._id,
                    replyId: replyComment?._id,
                  }}
                />
              </div>
            </>
          ))}
        </>
      )}
    </CommentCardContent>
  );
};

export default CommentCard;
