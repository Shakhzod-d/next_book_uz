import styled from "@emotion/styled";
import get from "lodash.get";
import Link from "next/link";

export const NavbarTopStyled = styled("div")`
  border-bottom: 1px solid;
  border-bottom-color: #f1f1f1;
  padding: 10px 0;
  .logo {
    @media screen and (max-width: 600px) {
      margin-right: 20px !important;
    }
  }
  .label-text {
    @media screen and (max-width: 600px) {
      margin-right: 20px !important;
    }
  }

  .phone-number {
    color: ${({ theme }) => get(theme, "palette.text.main")};
  }
  svg {
    path {
      fill: ${({ theme }) => get(theme, "palette.text.grey")};
    }
  }
`;

export const BookLabel = styled("div")`
  font-style: italic;
  color: ${({ theme }) => get(theme, "palette.text.main")};
`;

export const PurchaseText = styled(Link)`
  color: ${({ theme }) => get(theme, "palette.text.grey")};
  text-decoration: underline;
`;
