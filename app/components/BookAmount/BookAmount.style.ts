import styled from "@emotion/styled";
import get from "lodash.get";

export const BookAmountStyled = styled("section")``;

export const BookAmountCard = styled("div")`
  background-color: ${({ theme }) => get(theme, "palette.warning.300")};
  padding: 28px 24px;
  border-radius: 16px;
  height: 100%;
  @media screen and (max-width: 900px) {
    display: block;
  }
  @media screen and (max-width: 600px) {
    display: flex;
    padding: 20px 16px;
  }
  h2.book-amount {
    font-weight: 600;
    @media screen and (max-width: 600px) {
      font-size: 24px;
      margin-bottom: 8px;
    }
  }
  p.book-amount-msg {
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
  div.bg-book-warning {
    padding: 15px;
    border-radius: 50%;
    width: fit-content;
    background-color: ${({ theme }) => get(theme, "palette.common.white")};
  }
`;
