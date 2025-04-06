import styled from "@emotion/styled";
import get from "lodash.get";

export const CardStyled = styled("div")`
  border-radius: 8px;
  background-color: ${({ theme }) => get(theme, "palette.background.light")};
  p.order-number {
    font-weight: 500;
    font-size: 18px;
    color: ${({ theme }) => get(theme, "palette.text.black")};
    @media screen and (max-width: 900px) {
      font-size: 16px;
    }
  }
  time.order-date {
    font-size: 16px;
    color: ${({ theme }) => get(theme, "palette.text.black")};
    @media screen and (max-width: 900px) {
      font-size: 14px;
    }
  }
  p.book-price {
    color: ${({ theme }) => get(theme, "palette.text.black")};
    font-size: 18px;
    font-weight: 500;
    @media screen and (max-width: 900px) {
      font-size: 16px;
    }
  }
`;

export const StatusButton = styled("button")<{
  backgroundColor: string;
  color: string;
}>`
  border: none;
  outline: none;
  border-radius: 4px;
  padding: 8px 16px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  font-size: 14px;
`;
