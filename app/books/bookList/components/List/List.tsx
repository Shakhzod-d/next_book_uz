"use client";

import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { IBook } from "@/types/common";
import { BookListContext } from "../../context";
import get from "lodash.get";
import {
  BookCard,
  BookCardSkeleton,
  DataNotFound,
  Pagination,
} from "@/components";
import { IList } from "./List.types";
import { usePathname, useSearchParams } from "next/navigation";

const List: React.FC<IList> = ({ gridSize, matches }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const search = searchParams.toString();

  const {
    actions: { getBookList },
  } = React.useContext(BookListContext);

  const { data, isLoading } = useQuery({
    queryKey: ["bookList", search, pathname],
    queryFn: getBookList,
  });
  // const rate = get(data, "data.data");

  const skleton = React.useMemo(() => {
    return new Array(13).fill("", 0, 12).map((_: unknown, i) => (
      <Grid
        item
        xl={gridSize}
        lg={gridSize}
        md={gridSize}
        sm={4}
        xs={6}
        key={"list-skeleton" + i + 1}
      >
        <BookCardSkeleton />
      </Grid>
    ));
  }, [gridSize]);

  return (
    <React.Fragment>
      <Grid
        container
        columnSpacing={2}
        rowSpacing={{ md: 4, sm: 2 }}
        className="pt-2"
      >
        {isLoading ? (
          skleton
        ) : get(data, "data.data.data.length") !== 0 ? (
          get(data, "data.data.data", [])?.map(
            ({
              _id,
              author,
              authors,
              bookPrice,
              imgUrl,
              name,
              state,
              link,
              cover,
              discounts,
              amount,
              genres,
              rating,
              rateCount,
            }: IBook) => {
              return (
                <Grid
                  item
                  xl={gridSize}
                  lg={gridSize}
                  md={gridSize}
                  sm={4}
                  xs={6}
                  key={_id}
                  className={`${matches ? "mb-2" : ""}`}
                >
                  <BookCard
                    {...{
                      _id,
                      author,
                      authors,
                      bookPrice,
                      imgUrl,
                      name,
                      state,
                      link,
                      cover,
                      discounts,
                      amount,
                      genres,
                      rating,
                      rateCount,
                    }}
                  />
                </Grid>
              );
            }
          )
        ) : (
          <Grid item xs={12}>
            <DataNotFound title="COMMON.PRODUCT_NOT_FOUND" />
          </Grid>
        )}
      </Grid>
      <div className="d-flex justify-content-center">
        <Pagination total={get(data, "data.data.total", 0)} className="py-5" />
      </div>
    </React.Fragment>
  );
};

export default React.memo(List);
