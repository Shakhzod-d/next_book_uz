"use client";

import get from "lodash.get";
import parse from "html-react-parser";
import React, { useContext, useEffect, useState } from "react";
import JsonToHtml from "@/utils/jsonToHtml/jsonToHtml";
import { NewsContext } from "../context";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import { Button, Input, Loader } from "@/components";
import CalendarIcon from "../../assets/CalendarIcon";
import { NewsDetailsStyled } from "./NewsDetails.style";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import TelegramIcon from "@/assets/icons/TelegramIcon";
import InstagramColouredIcon from "@/assets/icons/InstagramColouredIcon";
import { dateCovert } from "@/services/dateConvert/dateCovert";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import browserStorage from "@/services/storage/browserStorage";
import toast from "react-hot-toast";
import { LayoutContext } from "@/layout/context";
import { ParamValue } from "next/dist/server/request/params";

interface INewsDetailsProps {
  slug?: ParamValue;
}

const NewsDetails = ({ slug }: INewsDetailsProps) => {
  const { t } = useTranslation();
  // const router = useRouter();
  // const { slug } = router?.query;
  const [loading, setLoading] = useState<boolean>(false);
  // console.log(params, id);

  const {
    state: { isAuth },
    actions: { setAuthOpen },
  } = React.useContext(LayoutContext);
  // const {
  //   state: { getNewByIdStates },
  //   actions,
  // } = useContext(NewsContext);
  const newsContext = useContext(NewsContext);

  const getNewByIdData =
    newsContext?.state?.getNewByIdStates?.getNewByIdData || null;
  const getNewByIdStatus =
    newsContext?.state?.getNewByIdStates?.getNewByIdStatus;
  const getNewById = newsContext?.actions?.getNewById;

  const { register, handleSubmit, formState, reset } = useForm(),
    token: string | undefined | null = browserStorage.get("token"),
    user = browserStorage.get("user"),
    parseUser = user ? JSON.parse(String(user)) : {};

  useEffect(() => {
    getNewById(slug);
  }, []);

  const getCommit = async () => {
    try {
      const response = await axios.get(
        `/news/comment?newsId=${getNewByIdData?.data?._id}&limit=1000&page=1`
      );
      return response;
    } catch (err) {
      throw err;
    }
  };
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["comment", getNewByIdData?.data?._id],
    queryFn: getCommit,
    enabled: Boolean(getNewByIdData?.data?._id),
  });
  const comments: unknown[] | [] = data?.data.data ? data?.data.data.data : [];

  const submitted = () => {
    reset();
    refetch();
    setLoading(false);
  };
  if (getNewByIdStatus === REQUEST_STATUS.loading) return <Loader />;
  const submitCommit = (data: any) => {
    if (!isAuth) return setAuthOpen(true);

    if (token && data.commit !== "") {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const raw = JSON.stringify({
        message: data.commit,
        newsId: slug,
        userId: parseUser._id,
      });

      const requestOptions: any = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://backend.book.uz/user-api//news/comment", requestOptions)
        .then((response) => response.text())
        .then()
        .catch((error) => console.error(error))
        .finally(submitted);
    } else {
      return toast.error(t("TOAST_MESSAGES.commitToast"));
    }
  };

  return (
    <NewsDetailsStyled className="container">
      <Grid container>
        <Grid item lg={9}>
          <h3 className="news-title font-600 ">
            {get(getNewByIdData, "data.title", "")}
          </h3>
          <div className="d-flex align-items-center mb-5 news-date-wrapper">
            <div className="d-flex align-items-center me-5">
              <span className="me-2">
                <CalendarIcon />
              </span>
              <span className="news-date">
                {dateCovert(get(getNewByIdData, "data.createdAt", ""))}
              </span>
            </div>

            {/* <div className="d-flex align-items-center me-3">
          <span className="me-2">
            <ViewIcon />
          </span>
          <span className="read-count">
            {get(getNewByIdData, "data.readCount", "")}
          </span>
        </div> */}
          </div>
          <div className="new-image">
            <LazyLoadImage
              src={
                process.env.NEXT_PUBLIC_BASE_URL +
                get(getNewByIdData, "data.imgUrl", "")
              }
            />
          </div>
          <div className="news-description mb-4 mt-2">
            <>{parse(JsonToHtml(get(getNewByIdData, "data.content", [])))}</>
          </div>
          <div className="comment_box">
            <span className="text">{t("NEWS.COMMENTS")}</span>
            <div className="write_comment_box">
              <form onSubmit={handleSubmit(submitCommit)}>
                <Input
                  className="mb-3  auth-input send_message_input"
                  placeholder={
                    t("NEWS.ENTER_YOUR_COMMENT") || "Enter your comment..."
                  }
                  error={formState.errors.lastName}
                  params={{
                    ...register("commit"),
                  }}
                />

                <Button
                  onClick={() => {}}
                  variant="contained"
                  color="warning"
                  value={t("NEWS.TO_COMMENT") || "Comment"}
                  className="comment_btn"
                  type="submit"
                  disabled={loading}
                />
              </form>
            </div>
            <div className="comment_list">
              {comments?.map((item: any, idx) => {
                const data = new Date(item.createdAt);

                return (
                  <div className="comment_text" key={idx}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <b className="text">{item.user.firstName}</b>
                      <span style={{ fontSize: "14px", color: "#b3b3b3" }}>
                        {data.getDate()}-{data.getMonth()}-{data.getFullYear()}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontSize: "14px" }} className="text">
                        {t("NEWS.COMMENT")}
                      </span>
                      <p className="text">{item.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="d-flex align-items-center mb-5">
            <span className="font-600 me-2 share-text">{t("NEWS.SHARE")}</span>
            <ul className="list-unstyled m-0 p-0 d-flex align-items-center icon-list ">
              <li className="icon-list-item facebook-icon me-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://book.uz/news/${get(
                    getNewByIdData,
                    "data._id",
                    ""
                  )}`}
                >
                  <FacebookIcon />
                </a>
              </li>
              <li className="icon-list-item instagram-icon me-3">
                <a href="https://instagram.com/bookuzbekistan">
                  <InstagramColouredIcon />
                </a>
              </li>
              <li className="icon-list-item telegram-icon">
                <a
                  href={`https://t.me/share/url?url=https://book.uz/news/${get(
                    getNewByIdData,
                    "data._id",
                    ""
                  )}`}
                >
                  <TelegramIcon />
                </a>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </NewsDetailsStyled>
  );
};

export default NewsDetails;
