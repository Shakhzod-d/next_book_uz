import styled from "@emotion/styled";
import get from "lodash.get";
export const OfferOfTheWeekAlternativeCarouselStyled = styled("div")`
  &.offer-of-the-week-alternative {
    margin-bottom: 75px;
    position: relative;
    @media screen and (max-width: 676px) {
      margin-bottom: 45px;
    }

    .slider-full-image-skeleton {
      width: 100%;
      aspect-ratio: 3/1;
      border-radius: 16px;
    }

    .slick-slider.slick-initialized {
      @media screen and (max-width: 676px) {
        transform: scaleY(1.2);
      }
      .slick-list {
        overflow: hidden;
        .slick-track {
          .slick-slide {
            width: 100%;
            & > div {
              width: 100%;
            }
            .lazy-load-image-background {
              width: 100%;
              img.slider-full-image {
                aspect-ratio: 3/1;
                border-radius: 16px;
              }
            }
          }
        }
      }

      ul.slick-dots {
        position: absolute;
        bottom: 10px;
        li {
          margin: auto 2px;
          @media screen and (max-width: 600px) {
            margin: 0;
            width: 16px;
          }
          button {
            transition: all linear 0.2s;
            padding: 0;
            width: 12px;
            height: 12px;

            background-color: #ffffff;
            border-radius: 50%;
            @media screen and (max-width: 600px) {
              width: 6px;
              height: 6px;
            }
            &:before {
              display: none;
            }
          }
        }
        li.slick-active {
          button {
            background-color: #ef7f1a;
          }
        }
      }
      .slick-arrow {
        display: none !important;
      }
    }
  }
`;
