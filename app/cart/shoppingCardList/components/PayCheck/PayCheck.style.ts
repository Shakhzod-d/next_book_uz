import { Button } from "@/components";
import styled from "@emotion/styled";
import get from "lodash.get";

export const PayCheckStyled = styled.div`
  border-radius: 8px;
  background: ${({ theme }: any) => theme?.palette?.background?.light};

  .payment-title {
    color: ${({ theme }) => get(theme, "palette.text.main")};
    font-size: 18px;
    @media screen and (max-width: 600px) {
      display: none;
    }
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
        @media screen and (max-width: 600px) {
          font-size: 14px;
        }
      }
    }
  }
  .grey-text {
    color: ${({ theme }) =>
      get(theme, "palette.mode") === "light"
        ? get(theme, "palette.text.secondary")
        : "rgba(255, 255, 255, 80%)"};
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
  hr {
    background-color: #eee;
  }
`;

export const PaymentContainer = styled("div")`
  @media screen and (max-width: 900px) {
    max-width: fit-content;
  }
  @media screen and (max-width: 600px) {
    max-width: 100%;
  }
`;

export const BuyButton = styled(Button)`
  &.MuiButton-root.MuiButton-contained {
    padding: 11px 25px !important;

    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
`;
