import styled from "@emotion/styled";
import get from "lodash.get";

export const PaymentCheckStyled = styled.div`
  border-radius: 8px;
  background: ${({ theme }: any) => theme?.palette?.background?.paper};

  .payment-title {
    font-size: 18px;
    color: ${({ theme }) => get(theme, "palette.text.main")};
  }

  .black-text {
    color: ${({ theme }) => get(theme, "palette.text.main")};
  }

  ul.order-list {
    li.order-list-item {
      .grey-text {
        color: ${({ theme }) =>
          get(theme, "palette.mode") === "light"
            ? get(theme, "palette.text.secondary")
            : "rgba(255, 255, 255, 80%)"};
      }
    }
  }
  .grey-text {
    color: ${({ theme }) =>
      get(theme, "palette.mode") === "light"
        ? get(theme, "palette.text.secondary")
        : "rgba(255, 255, 255, 80%)"};
  }
  hr {
    background-color: #d9d9d9;
  }
`;

export const RulesStyled = styled("div")`
  color: ${({ theme }) =>
    get(theme, "palette.mode") === "light"
      ? get(theme, "palette.text.secondary")
      : "rgba(255, 255, 255, 80%)"};
  .rules-link {
    text-decoration: underline;
    color: ${({ theme }) =>
      get(theme, "palette.mode") === "light"
        ? get(theme, "palette.text.secondary")
        : "rgba(255, 255, 255, 80%)"};
  }
`;
