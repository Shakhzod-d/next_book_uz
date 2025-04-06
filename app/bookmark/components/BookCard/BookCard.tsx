import get from "lodash.get";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BagIcon from "@/assets/icons/BagIcon";
import formatter from "@/services/formatter";
import { useAddBookCart } from "@/hooks";
import { BookCardStyled } from "./BookCard.style";
import HeartFillIcon from "@/assets/icons/HeartFillIcon";
import { IBookMarkCard, ICardActions } from "./BookCard.types";
import { useRouter } from "next/navigation";

const CardActions: React.FC<ICardActions> = ({
  _id,
  amount,
  bookPrice,
  discounts,
  imgUrl,
  name,
  cover,
  author,
  state,
  link,
  genres,
}) => {
  const heartButtonRef = React.useRef<HTMLButtonElement>(null);
  const [addToCart] = useAddBookCart();

  const onMouseEnter = () => {
    (heartButtonRef.current as HTMLButtonElement)?.classList.add("block");
    (heartButtonRef.current as HTMLButtonElement)?.classList.remove("none");
  };

  const onMouseLeave = () => {
    (heartButtonRef.current as HTMLButtonElement)?.classList.add("none");
    (heartButtonRef.current as HTMLButtonElement)?.classList.remove("block");
  };

  return (
    <div className="card-actions">
      <div onClick={(e) => e.stopPropagation()}>
        <button
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="shopping-card-button"
          onClick={() =>
            addToCart({
              _id,
              amount: 1,
              bookPrice,
              cover,
              discounts,
              imgUrl: imgUrl || "",
              maxAmount: amount,
              name,
              author,
              state,
              link,
              genres,
            })
          }
        >
          <BagIcon />
        </button>
      </div>
    </div>
  );
};

const BookCard: React.FC<IBookMarkCard> = ({
  _id,
  author,
  bookPrice,
  imgUrl,
  name,
  link,
  amount,
  discounts,
  state,
  cover,
  genres,
  deleteBookmark,
}) => {
  const router = useRouter();

  const bookCardClick = () => {
    // navigate({ pathname: `/books/details/${link || _id}` }); MUST CHECK LATER
    router.push(`/books/details/${link || _id}`);
  };

  return (
    <BookCardStyled onClick={bookCardClick}>
      <div className="book-card-image-wrapper mb-2">
        <LazyLoadImage
          src={
            imgUrl
              ? process.env.NEXT_PUBLIC_BASE_URL + imgUrl
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD4t78KCOLWMSxWLWcqJGSFI75Eh4GX3ewhA&usqp=CAU"
          }
          effect="blur"
          className="book-card-image"
        />
        <div onClick={(event) => event.stopPropagation()}>
          <button onClick={() => deleteBookmark(_id)} className="bookmark-btn">
            <HeartFillIcon width="24px" height="24px" />
          </button>
        </div>
        <CardActions
          {...{
            _id,
            author,
            bookPrice,
            imgUrl,
            name,
            link,
            amount,
            discounts,
            state,
            cover,
            genres,
          }}
        />
      </div>

      <p className="card-title mb-1">{name}</p>
      <p className="card-text mb-1">{get(author, "fullName")}</p>
      <div className="card-price-text">{formatter(bookPrice)} so‘m</div>
    </BookCardStyled>
  );
};

export default BookCard;
