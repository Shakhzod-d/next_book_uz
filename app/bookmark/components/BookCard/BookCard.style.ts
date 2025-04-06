import styled from "@emotion/styled";
import get from "lodash.get";

export const BookCardStyled = styled("div")`
  .book-card-image-wrapper {
    position: relative;

    .lazy-load-image-background {
      width: 100%;
    }

    img.book-card-image {
      border-radius: 8px;
      width: 100%;
      height: 100%;
      max-height: 390px;
      vertical-align: middle;
      border-style: none;
      aspect-ratio: 1/1.5;
      @media screen and (max-width: 600px) {
        max-height: 250px;
      }
    }

    button.bookmark-btn {
      border: none;
      outline: none;
      position: absolute;
      left: 5px;
      top: 5px;
      background-color: transparent;
      :hover {
        cursor: pointer;
      }
      svg {
        path:first-of-type {
          fill: ${({ theme }) => get(theme, "palette.text.white")};
        }
        path:last-child {
          fill: ${({ theme }) => get(theme, "palette.error.main")};
        }
      }
    }
    div.card-actions {
      position: absolute;
      bottom: 11px;
      right: 7px;
      }
      }
      }
      p.card-title {
        font-weight: 600;
        font-size: 19px;
        line-height: 22px;
        @media screen and (max-width: 600px) {
      font-size: 15px;
      }
      }
    
      p.card-text {
    font-weight: 400;
    font-size: 15px;
    line-height: 17px;
    color: ${({ theme }) => get(theme, "palette.text.secondary")};
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
  div.card-price-text {
    font-weight: 600;
    font-size: 23px;
    color: ${({ theme }) => get(theme, "palette.text.disabled")};
    font-family: "Montserrat", sans-serif;
    @media screen and (max-width: 600px) {
      font-size: 16px;
    }
  }
`;
