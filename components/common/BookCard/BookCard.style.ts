import styled from "@emotion/styled";
import get from "lodash.get";

export const BookCardStyled = styled("div")`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) =>
    get(theme, "palette.mode") === "dark" ? "#081B33" : "#fff"};
  color: ${({ theme }) =>
    get(theme, "palette.mode") === "dark" ? "#fff" : "#000"};
  padding: 10px;
  height: 100%;

  border-radius: 10px;
  border: 1px solid
    ${({ theme }) =>
      get(theme, "palette.mode") === "dark" ? "#10325C" : "#ddd"};
  box-shadow: 0px 4px 10px
    ${({ theme }) =>
      get(theme, "palette.mode") === "dark"
        ? "rgba(0, 0, 0, 0.3)"
        : "rgba(0, 0, 0, 0.1)"};
  transition: all 0.3s ease-in-out;

  .book-card-image-wrapper {
    position: relative;
    max-height: 390px;
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
      &.logo-image {
        transform: scale(0.7);
      }
    }
    div.card-actions {
      position: absolute;
      top: 10px;
      right: 7px;

      button.shopping-card-button,
      button.heart-card-button {
        border: none;
        border-radius: 50%;
        overflow: hidden;
        background-color: ${({ theme }) =>
          get(theme, "palette.background.warningWhite")};
        outline: none;
        padding: 5px 7px;
        @media screen and (max-width: 600px) {
          padding: 3px 5px;
        }
        transition: all 0.2s linear;
        :hover {
          cursor: pointer;
          background-color: ${({ theme }) =>
            get(theme, "palette.warning.main")};
          svg {
            path {
              fill: ${({ theme }) => get(theme, "palette.text.white")};
            }
          }
        }
        svg {
          path {
            fill: ${({ theme }) => get(theme, "palette.text.primary")};
          }
        }
      }

      button.heart-card-button {
        padding: 8px;
        margin-right: 0 !important;
        @media screen and (max-width: 600px) {
          padding: 5px;
        }
        svg.fill {
          path {
            fill: ${({ theme }) => get(theme, "palette.error.main")};
          }
        }
      }
    }
  }
  p.card-title {
    color: ${({ theme }) => get(theme, "palette.text.main")};
    font-weight: 600;
    font-size: 19px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
  .card-old-price {
    text-decoration: line-through;
    margin-bottom: 4px !important;
    color: ${({ theme }: any) => theme?.palette?.error?.main};
    font-size: 13px;
    font-weight: 500;
  }
`;

export const Flex = styled.div`
  width: 100%;
 
  display: flex;
  align-items: center;

  gap: 16px;
  // position:absolute;
  left:0;
  bottom:10px;
  .button {
    width: 100%;
height:35px;
    border: none;
    background: #EF7F1A;
    color: #fff;
    border-radius:8px;
    cursor:pointer;
  }
      button.shopping-card-button {
        border: none;
        border-radius: 50%;
        overflow: hidden;

        background-color: #00bfaf;
        outline: none;
        padding: 5px 7px;
        @media screen and (max-width: 600px) {
          padding: 3px 5px;
        }
        :hover {
          cursor: pointer;
        }
`;
