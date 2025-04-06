import React from "react";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import get from "lodash.get";
import DefaultAuthorImage from "../../assets/DefaultAuthorImage.svg";
import { AuthorCardStyled } from "./AuthorCard.style";
import { IAuthorCardProps } from "./AuthorCard.types";
import BookIcon from "@/assets/icons/BookIcon";
import { dateCovert } from "@/services/dateConvert/dateCovert";
import Link from "next/link";
import Image from "next/image";

const AuthorCard = ({ author }: IAuthorCardProps) => {
  const authorImageCheck = (imgUrl: string | undefined | null) => {
    if (!imgUrl) {
      return DefaultAuthorImage;
    } else return process.env.NEXT_PUBLIC_BASE_URL + imgUrl;
  };

  return (
    <AuthorCardStyled className="d-flex">
      <Image
        // effect="blur"
        className="author-img"
        src={authorImageCheck(author.imgUrl)}
        alt={get(author, "fullName")}
      />
      <div>
        <p className="author-name">{get(author, "fullName")}</p>
        {get(author, "dateOfbirth") && (
          <p className="years">{dateCovert(get(author, "dateOfbirth"))}</p>
        )}

        <Link
          href={{
            pathname: `/books`,
            search: `?page=1&limit=24&authorIds=${get(author, "_id")}`,
          }}
          className="book-number d-flex align-items-center mt-2"
        >
          <BookIcon />
          <span className="ms-2 ">{get(author, "bookCount", "")} book</span>
        </Link>
      </div>
    </AuthorCardStyled>
  );
};

export default AuthorCard;
