"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import get from "lodash.get";
import { useEffect, useMemo, useContext } from "react";
import { useParams, usePathname } from "next/navigation";
import Head from "next/head";
import JsonToHtml from "@/utils/jsonToHtml/jsonToHtml";
import { scrollToDefault } from "@/utils/scrollToDefault/scrollToDefault";
import { BookDetailsContext } from "../../context";
import BookDetailsContent from "../BookDetailsContent/BookDetailsContent";
import Tab from "../Tab/container/Tab";

const Info: React.FC<{
  setAuthorId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setBookId: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ setAuthorId, setBookId }) => {
  const params = useParams();
  const pathname = usePathname();
  const id = params?.slug as string | undefined;

  console.log(params, pathname);

  const {
    state: {},
    actions: {},
  } = useContext(BookDetailsContext);

  useEffect(() => {
    scrollToDefault();
  }, []);

  const baseUrl = useMemo(() => {
    if (!pathname) return "";
    return pathname.includes("/books")
      ? "book"
      : pathname.includes("/packages")
      ? "collection"
      : "";
  }, [pathname]);

  const getBookById = async (id?: string) => {
    try {
      const res = await axios.get(`${baseUrl}/${id}`);
      return res;
    } catch (err) {
      throw err;
    }
  };

  const { isLoading, isError, error, data, status, isSuccess } = useQuery({
    queryKey: ["book/id", id],
    queryFn: () => getBookById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess) {
      setAuthorId(get(data, "data.data.author._id"));
      setBookId(get(data, "data.data._id", ""));
    }
  }, [isSuccess, data]);

  if (isError)
    return <>{get(error, "response.data.message", "Error loading data")}</>;

  return (
    <>
      <Head>
        <title>
          {get(data, "data.data.seo.title", "")
            ? get(data, "data.data.seo.title", "")
            : get(data, "data.data.name", "") +
              " - " +
              get(data, "data.data.author.fullName", "")}
        </title>
        <meta
          name="description"
          content={
            get(data, "data.data.seo.description", "")
              ? get(data, "data.data.seo.description", "")
              : get(data, "data.data.description", "")
              ? JsonToHtml(get(data, "data.data.description", ""))?.replace(
                  /<\/?[^>]+(>|$)/gi,
                  ""
                )
              : get(data, "data.data.name")
          }
        />
      </Head>
      <BookDetailsContent
        {...{ book: get(data, "data.data"), isLoading, status }}
      />
      <Tab
        {...{
          description: get(data, "data.data.description", []),
          isLoading,
          bookId: get(data, "data.data._id"),
        }}
      />
    </>
  );
};

export default Info;
