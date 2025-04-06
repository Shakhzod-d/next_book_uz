"use client";

import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import formatter from "@/services/formatter";
import LogoBig from "../../../../../../assets/images/LogoBig.svg";

import { BookCardStyled } from "@/components/common/BookCard/BookCard.style";
import { useRouter } from "next/navigation";

const PurchaseBook: React.FC<any> = ({ book }) => {
  const router = useRouter();

  const bookCardClick = () => {
    // navigate({ pathname: `/books/details/${book._id}` }); MUST CHECK LATER
    router.push(`/books/details/${book._id}`);
  };

  return (
    <BookCardStyled
    // onClick={bookCardClick}
    >
      <div className="book-card-image-wrapper mb-2">
        <LazyLoadImage
          src={
            book.imgUrl
              ? process.env.NEXT_PUBLIC_BASE_URL + book.imgUrl
              : LogoBig
          }
          effect="blur"
          className={`book-card-image ${!book.imgUrl ? "logo-image" : ""}`}
        />
      </div>

      <p className="card-title mb-1">{book.bookName}</p>

      <div className="card-price-text">
        {formatter(book.total)}
        &nbsp;UZS
      </div>
    </BookCardStyled>
  );
};

export default PurchaseBook;
