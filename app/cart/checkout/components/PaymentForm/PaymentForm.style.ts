import styled from "@emotion/styled";
import get from "lodash.get";

export const PaymentFormStyled = styled.form`
  label {
    @media screen and (max-width: 600px) {
      font-size: 15px !important;
    }
  }
`;

export const YandexMapStyled = styled.div<any>`
  overflow: hidden;
  .ymaps-2-1-79-map {
    width: 100% !important;
    border: 1px solid ${({ theme }: any) => theme?.palette?.grey[600]};
    .ymaps-2-1-79-map.ymaps-2-1-79-i-ua_js_yes {
      width: 100% !important;
    }
  }
`;

export const CheckPhoneNumberInputStyled = styled.div`
  input {
    border-radius: 28px !important;
    padding: 15px !important;
    color: ${({ theme }: any) => theme?.palette?.text?.secondary};
  }
`;

export const CheckButtonStyled = styled.div`
  @media screen and (max-width: 600px) {
    button.css-1uj81cj-MuiButtonBase-root-MuiButton-root {
      min-width: 100% !important;
      display: block;
    }
  }
`;

export const PaymentCardStyled = styled.ul`
  padding: 0;
  display: flex;
  margin: 0;
  list-style: none;

  .card-icon {
    border-radius: 6px;
    width: 150px;
    height: 80px;
    border: 1px solid #f1f1f1;
    padding: 10px 15px;
    margin-right: 10px;
    transition: all 0.1s linear;
    box-sizing: border-box;
    &.active {
      border: 2px solid ${({ theme }: any) => theme?.palette?.primary?.main};
      transform: scale(1.04);
    }

    label {
      img {
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
      &:hover {
        cursor: pointer;
      }
    }
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
`;

export const CheckoutCard = styled("div")`
  border-radius: 16px;
  padding: 16px 24px 24px;
  border: 1px solid
    ${({ theme }: any) =>
      get(theme, "palette.mode") === "light"
        ? theme.palette.grey["100"]
        : get(theme, "palette.background.whiteInfo")};
  background-color: ${({ theme }) =>
    get(theme, "palette.background.whiteInfo")};
  h3.checkout-cart-title {
    font-size: 18px;
    color: ${({ theme }) => get(theme, "palette.text.main")};
    @media screen and (max-width: 600px) {
      font-size: 16px;
    }
  }
  span.danger {
    color: #dc2626;
  }
  @media screen and (max-width: 600px) {
    padding: 12px;
  }
`;
