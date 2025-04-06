import ChevronRightIcon from "../../../../../../../assets/icons/ChevronRightIcon";
import get from "lodash.get";
import React from "react";
// import { useNavigate } from "react-router-dom";
import { CategoryListStyled, ChildList } from "./CategoryList.style";
import { ICategoryList } from "./CategoryList.types";
import { useRequest } from "@/hooks/useRequest/useRequest";
import { IGenre } from "@/types/common";
import { REQUEST_STATUS } from "@/hooks/useRequest/useRequest.constants";
import { useRouter } from "next/navigation";

const CategoryList: React.FC<ICategoryList> = ({ handleClose }) => {
  // const navigate = useNavigate();
  const router = useRouter();
  const [activeCategoryId, setActiveCategoryId] = React.useState<string | null>(
    null
  );

  const [getGenresClient, getGenreResponse, getGenresStatus, getGenresError] =
    useRequest();

  React.useEffect(() => {
    getGenres();
  }, []);

  const getGenres = async () => {
    await getGenresClient.get(`genre?page=1`);
  };

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

  const childList: IGenre[] = React.useMemo(() => {
    return get(getGenreResponse, "data.data", []).filter(
      (item: IGenre) => item.parentId == activeCategoryId
    );
  }, [activeCategoryId]);

  function genreItemClick(id: string) {
    // navigate({
    //   pathname: `/books`,
    //   search: `?page=1&limit=24&genreIds=${id}`,
    // }); MUST CHECK LATER
    router.push(`/books?page=1&limit=24&genreIds=${id}`);
    handleClose();
  }

  if (getGenresStatus === REQUEST_STATUS.failed)
    return get(getGenresError, "response.data.message", "");

  return (
    <CategoryListStyled className="list-unstyled p-0 m-0 pt-3  ">
      <div className="d-flex ">
        <div className="pe-5">
          {sortGenre()?.map((genre) => (
            <div
              key={get(genre, "_id")}
              className={`genre-list-item mb-3 pe-3 ${
                activeCategoryId === get(genre, "_id") ? "active" : ""
              }`}
            >
              {get(genre, "childs.length") ? (
                <div className="p-0 d-flex align-items-center genre-name">
                  <div onClick={() => genreItemClick(genre._id)}>
                    {genre.name}
                  </div>
                  <span
                    onClick={() => setActiveCategoryId(get(genre, "_id"))}
                    className="ms-1 chevron-icon"
                  >
                    <ChevronRightIcon />
                  </span>
                </div>
              ) : (
                <div
                  className="p-0  genre-name"
                  onClick={() => genreItemClick(genre._id)}
                >
                  {genre.name}
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <ChildList>
            {childList.map((childGenre) => (
              <div
                className="mb-3 ps-3 child-genre"
                key={childGenre._id}
                onClick={() => genreItemClick(childGenre._id)}
              >
                {childGenre.name}
              </div>
            ))}
          </ChildList>
        </div>
      </div>
    </CategoryListStyled>
  );
};

export default CategoryList;
