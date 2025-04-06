import styled from "@emotion/styled";
import get from "lodash.get";

export const CarouselBookCardStyled = styled("div")`
  position: relative;
  background-color: ${({ theme }) =>
    get(theme, "palette.background.lightAlternative")};
  min-height: 200px;
  border-radius: 16px;
  @media screen and (max-width: 600px) {
    min-height: 130px;
  }

  .book-card-container {
    .book-card-left {
      .lazy-image {
        width: 163px;
        height: 226px;
        border-radius: 8px;
        position: relative;
        top: -40px;
        left: 20px;
        z-index: 1000000000000;
        aspect-ratio: 1/1.5;
        max-height: 226px;
        @media screen and (max-width: 600px) {
          width: 150px;
          height: 210px;
          top: -30px;
        }
      }
    }
    .book-card-right {
      width: 100%;
      padding-left: 35px;
      h5.alternative-card-title {
        font-weight: 600;
        font-size: 24px;
        line-height: 29px;
        color: ${({ theme }) => get(theme, "palette.text.infoDark")};
        @media screen and (max-width: 600px) {
          font-size: 16px;
        }
      }
      p.altennative-card {
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        @media screen and (max-width: 600px) {
          font-size: 13px;
        }
      }
      div.rate-text {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        @media screen and (max-width: 600px) {
          font-size: 12px;
        }
      }
      div.alternative-card-price {
        font-family: "Montserrat", sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 29px;
        @media screen and (max-width: 600px) {
          font-size: 16px;
        }
      }
      button.boomark-btn {
        padding: 9px;
        border: none;
        outline: none;
        border-radius: 50%;
        background-color: ${({ theme }) => get(theme, "palette.common.white")};
        svg {
          path {
            fill: ${({ theme }) => get(theme, "palette.error.main")};
          }
        }
      }
    }
  }
`;
