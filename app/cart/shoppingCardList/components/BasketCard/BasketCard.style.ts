import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import get from "lodash.get";

export const BasketCardStyled = styled.div`
  padding: 25px;
  border-radius: 8px;
  background: ${({ theme }: any) => theme?.palette?.background?.light};
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 12px;
  @media screen and (max-width: 600px) {
    padding: 12px 12px 12px 8px;
  }
  .cart-left {
    position: relative;

    .cart-image {
      max-height: 140px;
      aspect-ratio: 1/1.05;
      overflow: hidden;
      @media screen and (max-width: 600px) {
        height: 150px;
        padding-left: 0 !important;
        aspect-ratio: 1/1.3;
      }
    }
    .mobile-heart-btn {
      visibility: hidden;
      border: none;
      outline: none;
      padding: 4px;
      border-radius: 50%;
      z-index: -1;
      position: absolute;
      bottom: 0.5rem;
      right: 1.3rem;
      svg {
        path {
          fill: #fff;
        }
      }
      svg.fill {
        path:first-of-type {
          fill: #fff;
        }
        path:last-child {
          fill: red;
        }
      }

      @media screen and (max-width: 600px) {
        visibility: visible;

        background-color: ${({ theme }: any) => theme?.palette?.warning?.main};
        z-index: 1;
      }
    }
  }
  .cart-right {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
      flex-direction: column;
    }
    .cart-details {
      @media screen and (max-width: 600px) {
        display: flex;
        justify-content: space-between;
      }
      .cart-name {
        font-size: 20px;
        font-family: "Montserrat", sans-serif;
        color: ${({ theme }) => get(theme, "palette.text.primary")};
        @media screen and (max-width: 600px) {
          font-size: 15px;
        }
      }
      .cart-price {
        color: ${({ theme }) => get(theme, "palette.text.light5e")};
        @media screen and (max-width: 600px) {
          display: none;
        }
      }
      .cart-actions {
        @media screen and (max-width: 600px) {
          display: none;
        }
        button {
          outline: none;
          border: none;

          :hover {
            cursor: pointer;
          }
        }
        button.bookmark-btn {
          padding: 8px 12px;
          color: ${({ theme }) =>
            get(theme, "palette.mode") === "light"
              ? get(theme, "palette.warning.main")
              : "#D65811"};
          background-color: ${({ theme }) =>
            get(theme, "palette.mode") === "light"
              ? get(theme, "palette.warning.200")
              : "#FFD7C1"};
          border-radius: 8px;
          svg {
            path {
              fill: ${({ theme }) => get(theme, "palette.warning.main")};
            }
            &.fill {
              stroke: ${({ theme }) => get(theme, "palette.warning.main")};
            }
          }
        }

        button.delete-btn {
          color: ${({ theme }) =>
            get(theme, "palette.mode") === "light"
              ? get(theme, "palette.text.secondary")
              : "rgba(255, 255, 255, 60%)"};
          padding: 2px;
          background-color: transparent;
          svg {
            path {
              fill: ${({ theme }) =>
                get(theme, "palette.mode") === "light"
                  ? get(theme, "palette.text.secondary")
                  : "rgba(255, 255, 255, 60%)"};
            }
          }
        }
      }
      .mobile-cancel-icon {
        display: none;
        @media screen and (max-width: 600px) {
          display: block;
          svg {
            path {
              fill: #828282;
            }
          }
        }
      }
    }
    .card-right-end {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      @media screen and (max-width: 600px) {
        flex-direction: row-reverse;
        align-items: center;
        padding-top: 10px;
      }
      .cart-price {
        font-size: 24px;
        font-family: "Montserrat", sans-serif;
        color: ${({ theme }) => get(theme, "palette.text.primary")};
        @media screen and (max-width: 600px) {
          font-size: 16px;
        }
      }
      .book-count-wrapper {
        background-color: ${({ theme }) =>
          get(theme, "palette.background.info")};

        border: 0.5px solid
          ${({ theme }) =>
            get(theme, "palette.mode") === "light"
              ? get(theme, "palette.grey.200")
              : get(theme, "palette.background.info")};
        border-radius: 12px;
        @media screen and (max-width: 600px) {
          padding: 4px !important;
          border-radius: 8px;
        }
      }
      div.book-count {
        color: ${({ theme }) => get(theme, "palette.primary.main")};
        @media screen and (max-width: 600px) {
          padding: 0 10px;
          font-size: 13px;
        }
      }
      button {
        border: none;
        outline: none;
        background-color: ${({ theme }) => get(theme, "palette.primary.light")};
        border-radius: 50%;
        padding: 8px 11px;
        cursor: pointer;
        :disabled {
          opacity: 0.7;
        }
        @media screen and (max-width: 600px) {
          padding: 4px 6px;
        }
      }
    }
  }
`;

export const ButtonGroupStyled = styled(Grid)`
  div {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    display: inline-block;
  }

  button {
    padding: 4px;
    min-width: auto;
    border-radius: 5px;
  }
  button:first-of-type {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  button:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  input {
    border: none;
    outline: none;
    width: 60px;
    text-align: center;
    &::-webkit-inner-spin-button {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    display: flex;
    justify-content: center;
  }
`;

export const BookNameText = styled.p`
  font-size: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media screen and (max-width: 600px) {
    font-size: 17px;
    padding-right: 0px !important;
  }
  @media screen and (max-width: 500px) {
    text-align: center;
  }
`;

export const OldPriceStyled = styled.p`
  color: ${({ theme }: any) => theme?.palette?.error?.main};
  text-decoration: line-through;
  font-size: 11px;
  margin: 0;
  text-align: end;
  @media screen and (max-width: 600px) {
    text-align: start;
    padding-top: 10px;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    justify-content: center;
  }
`;

export const PriceStyled = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-top: 2px;
  text-align: end;

  @media screen and (max-width: 600px) {
    padding-top: 5px;
    text-align: start;
    font-size: 20px;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    justify-content: center;
  }
`;

export const ShoppingCardDeleteStyled = styled.div`
  display: flex;
  justify-content: end;
  @media screen and (max-width: 600px) {
    justify-content: start;
  }
  @media screen and (max-width: 500px) {
    justify-content: center;
  }
`;
