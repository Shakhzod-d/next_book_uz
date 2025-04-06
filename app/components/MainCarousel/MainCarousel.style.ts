import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import get from "lodash.get";

export const SlickCarouselStyled = styled("div")`
  &.main-carousel {
    border-radius: 8px;

    @media screen and (max-width: 900px) {
      margin-top: 2rem;
      padding-top: 0 !important;
    }

    @media screen and (max-width: 700px) {
      margin-top: 1rem;
    }

    .slick-slider {
      z-index: 3 !important;
    }

    .slick-slider.slick-initialized {
      .slick-list {
        .slick-track {
          .slick-slide {
            &.slick-active {
              z-index: 999 !important;
            }
            .carouselItem {
              img {
                width: 100%;
                border-radius: 8px;
                aspect-ratio: 2/0.996;
                @media screen and (max-width: 600px) {
                  aspect-ratio: 1/0.6;
                }
              }
              .lazy-load-image-background {
                width: 100% !important;
              }
            }
          }
        }
      }

      .slick-arrow {
        @media screen and (max-width: 600px) {
          display: none !important;
        }
        &.slick-disabled {
          opacity: 0.6;
        }
      }

      & > button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        width: auto;
        height: auto;
        background-color: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(5px);
        padding: 12px;
        border-radius: 50%;

        &:hover {
          cursor: pointer;
        }

        &::before {
          display: none;
        }
      }

      .slick-prev {
        left: 15px;
      }
      .slick-next {
        right: 15px;
      }
      .slick-dots {
        bottom: 10px;
        display: none !important;
        @media screen and (max-width: 600px) {
          display: block !important;
        }
        li {
          width: fit-content;
          height: fit-content;
          button {
            overflow: hidden;
            transition: all linear 0.2s;
            padding: 0;
            width: 6px;
            height: 6px;
            background-color: #fff;
            border-radius: 50%;
            opacity: 0.4;

            &:before {
              display: none;
            }
          }
        }
        li.slick-active {
          button {
            opacity: 1;
            background-color: ${({ theme }) =>
              get(theme, "palette.warning.main")};
          }
        }
      }
    }
  }
`;

export const MainCarouselSkletonStyled = styled(Skeleton)`
  @media screen and (max-width: 600px) {
    height: 350px !important;
  }
`;
