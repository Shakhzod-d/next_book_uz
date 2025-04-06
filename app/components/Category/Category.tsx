"use client";

import { Skeleton, Tooltip, useTheme } from "@mui/material";
import { useRequest } from "@/hooks/useRequest/useRequest";
import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import get from "lodash.get";
import React, { FC, useEffect } from "react";
import { IGenre } from "@/types/common";
import { CategoryList, ChildList, TooltipButton } from "./Category.style";
import { useRouter } from "next/navigation";

const ChildItem: FC<{
  childs: IGenre[];
  genreItemClick: (id: string) => void;
}> = ({ childs = [], genreItemClick }) => {
  if (!childs.length) return null;
  return (
    <ChildList className="list-unstyled p-0 m-0">
      {childs.map((childGenre) => (
        <li key={childGenre._id} onClick={() => genreItemClick(childGenre._id)}>
          {childGenre.name} ({get(childGenre, "bookCount", "0")})
        </li>
      ))}
    </ChildList>
  );
};

const Category = () => {
  const theme = useTheme();
  const router = useRouter();

  const [getGenresClient, getGenreResponse, getGenresStatus, getGenresError] =
    useRequest();

  const getGenres = async () => {
    await getGenresClient.get(`genre?page=1`);
  };

  useEffect(() => {
    getGenres();
    return () => {};
  }, []);

  function getChilds(id: string): IGenre[] {
    let filterGenreList: IGenre[] = [];
    filterGenreList = get(getGenreResponse, "data.data")?.filter(
      (item: IGenre) => item.parentId == id
    );
    return filterGenreList;
  }

  function sortGenre() {
    let list: IGenre[] = [];
    get(getGenreResponse, "data.data")?.forEach((item: IGenre) => {
      if (item.parentId == null) {
        let filterGenre = {
          ...item,
          childs: getChilds(item._id),
        };
        list.push(filterGenre);
      }
    });
    list = list.sort((b, a) => a?.childCount - b?.childCount);
    return list;
  }

  function genreItemMouseEnter(event: React.MouseEvent<HTMLButtonElement>) {
    const element = event.target as HTMLElement;
    // element.classList.add("active");
  }

  function genreItemClick(id: string) {
    // navigate({
    //   pathname: `/books`,
    //   search: `?page=1&limit=24&genreIds=${id}`,
    // });
    // MUST CHECK LATER
    router.push(`/books?page=1&limit=24&genreIds=${id}`);
  }

  if (getGenresStatus === REQUEST_STATUS.failed)
    return get(getGenresError, "response.data.message", "");
  if (getGenresStatus === REQUEST_STATUS.loading)
    return (
      <Skeleton
        height="480px"
        sx={{ borderRadius: "8px" }}
        variant="rectangular"
      />
    );

  return (
    <CategoryList className="list-unstyled p-0 m-0 pt-3  ">
      {sortGenre()?.map((genre) => (
        <li
          key={get(genre, "_id")}
          className="genre-list-item"
          // style={{ border: "1px solid red", margin: "10px 16px" }}
        >
          {get(genre, "childs.length") ? (
            <Tooltip
              componentsProps={{
                tooltip: {
                  sx: {
                    background: get(theme, "palette.background.default"),
                    borderRadius: "4px",
                    color: get(theme, "palette.text.primary"),
                    fontSize: "16px",
                  },
                },
              }}
              title={
                <ChildItem
                  childs={get(genre, "childs", [])}
                  genreItemClick={genreItemClick}
                />
              }
              placement="right-start"
            >
              <TooltipButton
                onMouseEnter={genreItemMouseEnter}
                // className="p-0 "
                onClick={() => genreItemClick(genre._id)}
              >
                {genre.name}
              </TooltipButton>
            </Tooltip>
          ) : (
            <TooltipButton
              // className="p-0 "
              onClick={() => genreItemClick(genre._id)}
            >
              {genre.name}
            </TooltipButton>
          )}
        </li>
      ))}
    </CategoryList>
  );
};

export default Category;
