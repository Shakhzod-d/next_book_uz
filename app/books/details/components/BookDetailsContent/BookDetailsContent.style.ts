import styled from "@emotion/styled";
import get from "lodash.get";

export const BookDetailsContentStyled = styled.div`
  .book-info {
    padding-left: 20px;
    @media screen and (max-width: 600px) {
      padding-left: 0;
    }
    .book-name {
      font-size: 28px;
      color: ${({ theme }) => get(theme, "palette.text.primary")};
      font-family: "Montserrat", sans-serif;
      @media screen and (max-width: 900px) {
        font-size: 20px;
      }
      @media screen and (max-width: 600px) {
        padding-top: 12px;
        margin-bottom: 0.8rem !important;
      }
    }
    .book-price {
      font-family: "Montserrat", sans-serif;
      font-weight: 500;
      /* margin-bottom: 20px; */
      color: ${({ theme }) => get(theme, "palette.text.disabled")};
      font-size: 28px;
      @media screen and (max-width: 900px) {
        font-size: 20px;
      }
    }
    .book-description {
      word-wrap: break-word;
      hyphens: auto;
    }
    .productDescTitle {
      font-size: 24px;
      font-weight: 500 !important;
    }
    .book-old-price {
      text-decoration: line-through;
      font-weight: 500;
      margin-bottom: 4px !important;
      color: ${({ theme }: any) => theme?.palette?.error?.main};
    }
    .book-rate-count {
      color: ${({ theme }) => get(theme, "palette.text.secondary")};
      @media screen and (max-width: 900px) {
        font-size: 14px;
      }
    }
    .book-rate {
      color: ${({ theme }) => get(theme, "palette.text.disabled")};
      @media screen and (max-width: 900px) {
        font-size: 14px;
      }
    }
    .author-name {
      font-size: 18px;
      color: ${({ theme }) => get(theme, "palette.primary.main")};
      font-weight: 500;
      @media screen and (max-width: 900px) {
        font-size: 16px;
      }
    }
    .actions-btn {
      @media screen and (max-width: 600px) {
        display: block !important;
      }
    }
  }
`;

export const TagListStyled = styled.ul`
  .tag-list-item {
    a {
      color: ${({ theme }: any) => theme?.palette?.primary?.main};
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const FeatureList = styled("ul")`
  .feature-list-item {
    .line {
      width: 100%;
      border-bottom: 1px dashed #a2aeba;
      align-self: flex-end;
      margin-bottom: 2px;
    }
    .table_cell.key {
      min-width: fit-content;
      padding: 0 3px;
      &:first-of-type {
        color: ${({ theme }) =>
          get(theme, "palette.mode") === "light" ? " #707f8d" : "#A7A7A7"};
      }
      @media screen and (max-width: 900px) {
        font-size: 14px;
      }
    }
    .table_cell.value {
      padding: 0 3px;
      white-space: nowrap;
      font-weight: 500;
      color: ${({ theme }) => get(theme, "palette.text.main")};
      @media screen and (max-width: 900px) {
        font-size: 14px;
      }
    }
  }
`;

export const AddCartButton = styled("button")`
  padding: 14px 32px;
  border: none;
  outline: none;
  background-color: ${({ theme }) => get(theme, "palette.warning.main")};
  border-radius: 8px;
  color: ${({ theme }) => get(theme, "palette.warning.contrastText")};
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin-right: 50px;
  border: 1px solid ${({ theme }) => get(theme, "palette.warning.main")};
  :disabled {
    opacity: 0.6;
    :hover {
      cursor: not-allowed;
    }
  }
  @media screen and (max-width: 1100px) {
    padding: 12px 24px;
    margin-right: 15px;
  }
  @media screen and (max-width: 900px) {
    font-size: 14px;
    line-height: 20px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
  @media screen and (max-width: 700px) {
    font-size: 14px;
    line-height: 18px;
    padding: 8px 20px;
    svg {
      width: 20px;
      height: 20px;
    }
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    justify-content: center;
    padding: 12px 24px;
    margin-bottom: 10px;
  }
  :hover {
    cursor: pointer;
  }
`;

export const GoCheckoutButton = styled("button")`
  padding: 14px 32px;
  border: none;
  outline: none;
  background-color: ${({ theme }) => get(theme, "palette.background.default")};
  border-radius: 8px;
  color: ${({ theme }) => get(theme, "palette.warning.main")};
  border: 1px solid ${({ theme }) => get(theme, "palette.warning.main")};
  font-weight: 500;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 24px;
  height: 100%;
  :disabled {
    opacity: 0.6;
    :hover {
      cursor: not-allowed;
    }
  }
  @media screen and (max-width: 900px) {
    font-size: 14px;
    line-height: 20px;
  }
  @media screen and (max-width: 1100px) {
    padding: 12px 24px;
  }
  @media screen and (max-width: 700px) {
    font-size: 14px;
    line-height: 18px;
    padding: 8px 20px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
    justify-content: center;
    padding: 12px 24px;
    margin-bottom: 10px;
  }
  :hover {
    cursor: pointer;
  }
`;
