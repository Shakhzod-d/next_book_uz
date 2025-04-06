"use client";

import React from "react";
import { CircularProgress, TextField } from "@mui/material";
import { BookListStyled, SearchPanelStyled } from "./SearchPanel.style";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import get from "lodash.get";
import { IBookList } from "./SearchPanel.types";
import ChevronRightIcon from "@/assets/icons/ChevronRightIcon";
import { IBook } from "@/types/common";
import formatter from "@/services/formatter";
import { useOutsideHandler } from "@/hooks/useOutSideHandler/useOutSideHandler";
import CancelIcon from "@/assets/icons/CancelIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "@/hooks";
import Link from "next/link";
import Image from "next/image";

const BookList: React.FC<IBookList> = ({
  data,
  isLoading,
  total,
  onClose,
  search,
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const bookCardClick = (link: string | undefined, _id: string) => {
    // navigate({ pathname: `/books/details/${link || _id}` });
    // MUST CHECK LATER
    router.push(`/books/details/${link || _id}`);
    onClose();
  };

  return (
    <BookListStyled>
      <div className="search-popover-header d-flex justify-content-between mb-3">
        <div className="search-popover-label">
          {t("NAVBAR.BOOKS")} ({total})
        </div>
        <Link
          href={{
            pathname: "/books",
            search: `?page=1&limit=24&search=${search}`,
          }}
          className="d-flex align-items-center search-popover-all-views"
          onClick={onClose}
        >
          {t("NAVBAR.ALL_VIEWS")}
          <span className="ms-1">
            <ChevronRightIcon width="14px" height="14px" />
          </span>
        </Link>
      </div>
      {isLoading ? (
        <div className="popver-loader d-flex justify-content-center p-3">
          <CircularProgress
            size={25}
            thickness={3}
            color="warning"
            disableShrink
            sx={{
              animationDuration: "400ms",
            }}
          />
        </div>
      ) : get(data, "length") === 0 ? (
        <div className="text-center no-books-text">{t("NAVBAR.NOT_BOOKS")}</div>
      ) : (
        <ul className="search-popover-list list-unstyled m-0 p-0">
          {data.map((book: IBook) => (
            <li
              onClick={() => bookCardClick(book.link, book._id)}
              className="search-popover-list-item d-flex mb-2"
              key={book._id}
            >
              <Image
                src={process.env.NEXT_PUBLIC_BASE_URL + book.imgUrl}
                className="search-popover-list-img"
                alt={book.name}
                width={8}
                height={8}
              />
              <div className="d-flex flex-grow justify-content-between ps-2">
                <div>
                  <p className="popover-list-name mb-2">
                    {get(book, "name", "")}
                  </p>

                  <p className="popover-list-author-name">
                    {get(book, "author.fullName", "")}
                  </p>
                </div>
                <p className="popover-list-price">
                  {formatter(book.bookPrice)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </BookListStyled>
  );
};

const SearchPanel = () => {
  const { t } = useTranslation();
  // const { pathname } = useLocation();
  const pathname = usePathname();
  const router = useRouter();
  const searchContentRef = React.useRef<HTMLDivElement | null>(null);
  const [isVisibleInput, setIsVisibleInput] = React.useState(true);
  const { formState, handleSubmit, setFocus, register, setValue, watch } =
    useForm();
  const searchValue = watch("search", false);
  const debouncedValue = useDebounce(searchValue);

  const mutationFn = async ({ search }: { search: string }) => {
    try {
      const response = await axios.get(`book?page=1&limit=4&search=${search}`);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const searchMutation = useMutation({
    mutationKey: ["getBookList/search"],
    mutationFn,
  });

  const handleInputChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // searchMutation.mutate({ search: event.target.value?.trim() });
    setValue(event.target.name, event.target.value);
    searchMutation.mutate({ search: debouncedValue });
  };

  const clearInput = () => {
    setValue("search", "");
    searchMutation.mutate({ search: "" });
  };

  const searchIconClick = () => {
    searchMutation.mutate({ search: searchValue?.trim() });
    // setFocus("search");
    // setIsVisibleInput((prev) => !prev);
  };

  const onSubmit = (data: any) => {
    // navigate({
    //   pathname: "/books",
    //   search: `?page=1&limit=24&search=${get(data, "search")}`,
    // });
    // MUST CHECK LATER
    router.push(`/books?page=1&limit=24&search=${get(data, "search")}`);
  };

  const onClose = () => {
    setIsVisibleInput(false);
    setValue("search", "");
  };

  console.log(debouncedValue);

  useOutsideHandler(searchContentRef, onClose);

  React.useEffect(() => {
    searchMutation.mutate({ search: debouncedValue || "" });
  }, [debouncedValue]);

  return (
    <SearchPanelStyled
      onSubmit={handleSubmit(onSubmit)}
      isVisibleInput={isVisibleInput}
    >
      <div ref={searchContentRef}>
        <TextField
          {...register("search")}
          onChange={handleInputChnage}
          className="search-input"
          placeholder={t("NAVBAR.LOOKING_FOR_BOOKS")}
          InputProps={{
            endAdornment: (
              <div className="search-icon-wrap d-flex align-items-center">
                <div
                  className="hover cancel-icon d-flex align-items-center"
                  onClick={clearInput}
                  style={{ visibility: searchValue ? "visible" : "hidden" }}
                >
                  <CancelIcon width="10px" height="10px" />
                </div>

                <div className="line mx-1"></div>
                <button
                  onClick={searchIconClick}
                  type="button"
                  className="hover d-flex align-items-center search-icon"
                >
                  <SearchIcon />
                </button>
              </div>
            ),
          }}
        />
        {pathname !== `/books` && searchValue && (
          <BookList
            data={get(searchMutation, "data.data.data.data", [])}
            isLoading={searchMutation.isPending}
            total={get(searchMutation, "data.data.data.total", 0)}
            onClose={onClose}
            search={searchValue}
          />
        )}
      </div>
    </SearchPanelStyled>
  );
};

export default SearchPanel;
