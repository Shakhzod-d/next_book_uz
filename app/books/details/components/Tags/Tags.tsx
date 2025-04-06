import { Skeleton } from "@mui/material";
import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import get from "lodash.get";
import React, { useContext } from "react";
import { BookDetailsContext } from "../../context";

const Tags = () => {
  const {
    state: {
      getBookByIdState: { getBookByIdRes, getBookByIdStatus, getBookByIdError },
    },
  } = useContext(BookDetailsContext);

  if (getBookByIdError === REQUEST_STATUS.failed) return <></>;

  return (
    <div>
      <ul className="list-unstyled m-0 d-flex ">
        {get(getBookByIdRes, "data.tags", [])?.map((tag: string) => {
          return <li className="me-3 mb-2">#{tag}</li>;
        })}
      </ul>
    </div>
  );
};

export default Tags;
