"use client";

import React from "react";
import { Grid } from "@mui/material";

import { AuthorListStyled } from "./AuthorList.style";
import get from "lodash.get";
import { Pagination } from "@/components";
import { MainContent } from "@/app/style/home";
import { useTranslation } from "react-i18next";
import { AuthorCard, AuthorCardSkleton } from "../components";
import { scrollToDefault } from "@/utils/scrollToDefault/scrollToDefault";
import { IAuthor } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/services/api/client";
import Link from "next/link";

const AuthorList = () => {
  const { t } = useTranslation();
  // const { search } = useLocation();
  const search = "";

  React.useEffect(() => {
    scrollToDefault();
  }, []);

  const getAuthor = async () => {
    try {
      return await axiosInstance.get(`author${search}?page=1&limit=24`);
    } catch (err) {
      throw err;
    }
  };

  const skleton = React.useMemo(() => {
    return new Array(9).fill("").map((_: string, index: number) => (
      <Grid item key={"author-skleton" + index} lg={4} sm={6} xs={12}>
        <AuthorCardSkleton />
      </Grid>
    ));
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["bookList", search],
    queryFn: getAuthor,
  });

  // return <Grid container spacing={3}>
  //   {skleton}
  // </Grid>

  return (
    <AuthorListStyled>
      <MainContent className="container mt-0">
        <div className="main-page-title mb-3">{t("NAVBAR.AUTHORS")}</div>
        <Grid container spacing={3}>
          {isLoading
            ? skleton
            : get(data, "data.data.data", []).map((author: IAuthor) => (
                <Grid item key={author._id} lg={4} sm={6} xs={12}>
                  <Link
                    className="hover"
                    href={{
                      pathname: `details/${author._id}`,
                      search: "?page=1&limit=10",
                    }}
                  >
                    <AuthorCard author={author} />
                  </Link>
                </Grid>
              ))}
        </Grid>
        <div className="d-flex justify-content-center">
          <Pagination
            total={get(data, "data.data.total", 0)}
            className=" py-5"
          />
        </div>
      </MainContent>
    </AuthorListStyled>
  );
};

export default AuthorList;
