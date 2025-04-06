import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { VerticalSliderCardStyled } from "./VerticalSliderCard.style";
import { IVerticalSliderCard } from "./VerticelSliderCard.types";
import Logo from "../MainImageCard/assets/Logo.png";

const VerticalSliderCard: FC<IVerticalSliderCard> = ({ imgUrl }) => {
  return (
    <VerticalSliderCardStyled>
      <LazyLoadImage
        effect="blur"
        className="vertical-img"
        src={imgUrl ? process.env.NEXT_PUBLIC_BASE_URL + imgUrl : Logo.src}
        alt=""
      />
    </VerticalSliderCardStyled>
  );
};

export default VerticalSliderCard;
