import styled from "@emotion/styled";
import get from "lodash.get";

export const OrderInfoStyled = styled("div")`
  .page-title {
    font-weight: 600;
    font-size: 24px;
    @media screen and (max-width: 900px) {
      font-size: 20px;
    }
  }
  .order-info-card {
    height: 100%;
    padding: 1rem;
    border-radius: 8px;
    background-color: ${({ theme }) => get(theme, "palette.background.light")};
    .order-info-card-label {
      color: ${({ theme }) => get(theme, "palette.text.secondary")};
      font-family: "Montserrat", sans-serif;
    }
    .order-info-card-text {
      font-family: "Mulish", sans-serif;
      font-weight: 500;
      color: ${({ theme }) => get(theme, "palette.text.black")};
    }
  }
`;
