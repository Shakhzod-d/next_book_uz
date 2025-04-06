import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import get from "lodash.get";
import Slider from "react-slick";

export const MiniSlider = styled(Slider)`
  &.details-vertical-slider {
    width: 80px;
    max-height: 500px;
    overflow: hidden;
    @media (max-width: 900px) {
      width: 100%;
      padding-top: 5px;
    }
    .slick-arrow {
      display: none !important;
    }
    .slick-list {
      height: 100%;
    }
  }
`;
export const BookImagescarousel = styled("div")<any>`
  position: relative;
  .main-slider-wrap {
    width: calc(100% - 100px);
    @media (max-width: 900px) {
      width: 100%;
    }
  }
  .bookmark-wrapper {
    position: absolute;
    bottom: 20px;
    right: 20px;
    outline: none;
    border: none;
    border-radius: 50%;
    background-color: ${({ theme }) => get(theme, "palette.warning.main", "")};
    z-index: 1;
    padding: 12px;
    svg.dislike path {
      fill: ${({ theme }) => get(theme, "palette.text.white", "")};
    }
    svg.like path:first-of-type {
      fill: ${({ theme }) => get(theme, "palette.text.white", "")};
    }
    @media (max-width: 900px) {
      bottom: 130px;
      padding: 10px;
    }

    @media (max-width: 600px) {
      bottom: 20px;
    }
  }
`;

export const MainSlider = styled(Slider)`
  &.details-main-slider {
    @media (max-width: 600px) {
      position: relative;
    }
    box-sizing: border-box;
    padding-left: 20px;
    .slick-arrow {
      display: none !important;
    }
    @media (max-width: 900px) {
      padding-left: 0;
    }
    ul.slick-dots {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      li {
        margin: 0;
        button {
          padding: 0;
          &::before {
            opacity: 1;
            color: ${({ theme }) =>
              get(theme, "palette.background.default", "")};
          }
        }
      }
      li.slick-active {
        button {
          &::before {
            color: ${({ theme }) => get(theme, "palette.active.warning", "")};
          }
        }
      }
    }
  }
`;

export const NextPrevButtonStyled = styled("span")`
  border: none;
  padding: 9px;
  border-radius: 8px;
  background: ${({ theme }) =>
    get(theme, "palette.primary.main", "")} !important;
  outline: 0;
  position: absolute;
  top: 50%;
  z-index: 3;
  display: flex !important;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    padding: 3px;
  }
  &.slick-next {
    left: 104%;
    right: auto !important;
  }
  &.slick-prev {
    right: 104% !important;
    left: auto !important;
  }
  &.slick-disabled {
    opacity: 0.5;
  }
  svg {
    width: 18px !important;
    height: 18px !important;
    @media (max-width: 600px) {
      height: 15px !important;
      width: 15px !important;
    }
  }
  &::before {
    display: none;
  }
`;

export const NextPrevVerticalCarouselButton = styled("button")``;

export const MainSliderSkleton = styled(Skeleton)`
  width: 100%;
  height: 100%;
  max-height: 540px;
  border-radius: 8px;
  aspect-ratio: 392/542;
  @media (max-width: 1120px) {
    aspect-ratio: 360/500;
  }

  @media (max-width: 970px) {
    aspect-ratio: 300/450;
  }
  @media (max-width: 600px) {
    max-height: 432px;
  }
`;

export const MiniSliderSkleton = styled(Skeleton)`
  width: 80px;
  height: 95px;
  border-radius: 8px;
  aspect-ratio: 1/1.14;
  padding-right: 4px;
`;
