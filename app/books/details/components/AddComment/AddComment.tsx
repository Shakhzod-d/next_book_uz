"use client";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Dialog, DialogContent, Grid, Rating } from "@mui/material";
import { IAddBookCommentRequest } from "../../context/BookDetailsContext.types";
import { BookCommentStyled, CommentDialog } from "./AddaComment.style.ts";
import { useTranslation } from "react-i18next";
import browserStorage from "@/services/storage/browserStorage";
import { LayoutContext } from "@/layout/context";
import { BookDetailsContext } from "../../context";
import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import { Button, TextArea } from "@/components";

const AddComment: React.FC<{ bookId: string }> = ({ bookId }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);
  const token = browserStorage.get<string>("token");

  const {
    state: { isAuth },
    actions: { setAuthOpen },
  } = useContext(LayoutContext);

  const { register, formState, handleSubmit, reset } = useForm();

  const {
    state: {
      addBookCommentState: {
        addBookCommentResponse,
        addBookCommentStatus,
        addBookCommentError,
      },
    },
    actions: { addBookComment, getBookCommentList },
  } = useContext(BookDetailsContext);

  useEffect(() => {
    if (addBookCommentStatus === REQUEST_STATUS.success) {
      setOpen(false);
      reset();
    }
  }, [addBookCommentStatus]);

  const addCommentFunction = async (data: any) => {
    if (id) {
      let addCommentRequest: IAddBookCommentRequest = {
        ...data,
        bookId,
        rating,
        message: data.message ?? null,
      };

      await addBookComment(addCommentRequest);
    }
  };

  const handleClick = () => {
    if (isAuth) setOpen(true);
    else setAuthOpen(true);
  };

  return (
    <BookCommentStyled>
      <div className="add-comment-msg" onClick={handleClick}>
        {t("DETAILS.ADD_COMMENT")}
      </div>
      <CommentDialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogContent className="p-4">
          <form onSubmit={handleSubmit(addCommentFunction)}>
            <Grid container className="mb-3">
              <Grid item className="me-3">
                {t("DETAILS.MY_RATING")}
              </Grid>
              <Grid item>
                <Rating
                  name="bookGrade"
                  value={rating}
                  precision={0.5}
                  size="large"
                  onChange={(e: any, newGrade: number | null) => {
                    if (newGrade === null) setRating(0);
                    else setRating(newGrade);
                  }}
                />
              </Grid>
            </Grid>
            {/* {!token && (
              <Input
                className="mb-4"
                label={t("REGISTER.FIRSTNAME")}
                error={formState.errors.nickname}
                params={{
                  ...register("nickname", {
                    required: {
                      value: true,
                      message: t("VALIDATION_MESSAGE"),
                    },
                  }),
                }}
              />
            )} */}

            <TextArea
              label={t("DETAILS.COMMENT")}
              className="mb-4"
              params={{
                ...register("message", {}),
              }}
            />
            <Grid container>
              <Grid item>
                <Button
                  status={addBookCommentStatus}
                  variant="contained"
                  color="warning"
                  value={t("COMMON.SEND")}
                  type="submit"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </CommentDialog>
    </BookCommentStyled>
  );
};

export default AddComment;
