import Link from "next/link";
import { useParams } from "next/navigation";
import { Grid } from "@mui/material";
// import BookIcon from "assets/icons/BookIcon";
import React from "react";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import { Link, useParams } from "react-router-dom";
import { AuthorInfoStyled } from "./AuthorInfo.style";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import get from "lodash.get";
// import { dateCovert } from "services/dateConvert/dateCovert";
// import JsonToHtml from "utils/jsonToHtml/jsonToHtml";
import DefaultAuthorImage from "../../../../app/authors/list/assets/DefaultAuthorImage.svg";
import { dateCovert } from "@/services/dateConvert/dateCovert";
import BookIcon from "@/assets/icons/BookIcon";
import JsonToHtml from "@/utils/jsonToHtml/jsonToHtml";

const AuthorInfo = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const getAuthorById = async () => {
    try {
      const res = await axios.get(`author/${id}`);
      return get(res, "data.data");
    } catch (err) {
      throw err;
    }
  };

  const { data } = useQuery({
    queryKey: ["authorById", id],
    queryFn: getAuthorById,
    retry: 2,
  });

  const date = React.useMemo(() => {
    if (!get(data, "dateOfbirth") && !get(data, "dateOfdeath")) return <></>;
    return (
      <>
        {dateCovert(get(data, "dateOfbirth"))} -{" "}
        {dateCovert(get(data, "dateOfdeath"))}
      </>
    );
  }, [data]);

  const authorImageCheck = (imgUrl: string | undefined | null) => {
    // if (!imgUrl) {
    return DefaultAuthorImage;
    // } else return process.env.NEXT_PUBLIC_BASE_URL + imgUrl;
  };

  return (
    <AuthorInfoStyled className="mb-5">
      <Grid container>
        <Grid item xl={5}>
          <LazyLoadImage
            className="author-image"
            effect="blur"
            src={authorImageCheck(get(data, "link"))}
          />
        </Grid>
        <Grid item xl={7}>
          <h1 className="author-fullname mb-0">{get(data, "fullName", "")}</h1>
          <p className="author-years my-3">{date}</p>
          <Link
            href={{
              pathname: `/books`,
              search: `?page=1&limit=24&authorIds=${""}`,
            }}
            className="book-number d-flex align-items-center mb-2"
          >
            <BookIcon />
            <span className="m-1 mb-2">{get(data, "bookCount", "")} book</span>
          </Link>
          <h4 className="font-700 mb-3 about-text">
            {t("AUTHOR.ABOUT_AUTHOR")}
          </h4>
          {/* <p className="about-author-text">
            {parse(String(JsonToHtml(get(data, "biography", []))))}
          </p> */}
          {/* MUST CHECK */}
          <p className="about-author-text">
            {
              parse(
                String(JsonToHtml(get(data, "biography", "")))
              ) as React.ReactNode
            }
          </p>
        </Grid>
      </Grid>
    </AuthorInfoStyled>
  );
};

export default AuthorInfo;
