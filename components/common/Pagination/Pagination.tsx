import get from "lodash.get";
import React from "react";
import { MuiPagination } from "./Pagination.style";
import { IPagination } from "./Pagination.types";
import { useCustomSearchParams } from "@/hooks";

const Pagination: React.FC<IPagination> = ({ total, ...props }) => {
  const [searchParams, setSearchParams] = useCustomSearchParams();

  const pageChange = (_: unknown, newPage: number) => {
    setSearchParams({ ...searchParams, page: newPage.toString() });
    window.scrollTo(0, 0);
  };

  if (!(+get(searchParams, "limit", 0) < total)) return <div {...props} />;

  return (
    <MuiPagination
      page={+get(searchParams, "page", 1)}
      onChange={pageChange}
      count={Math.ceil(total / +get(searchParams, "limit", 1))}
      {...props}
    />
  );
};

export default Pagination;
