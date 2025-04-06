import styled from "@emotion/styled";
import get from "lodash.get";

export const NavbarBottomStyled = styled("div")`
  .navs {
    .nav-item {
      a {
        color: ${({ theme }) => get(theme, "palette.text.main")};
      }
    }
  }
`;

export const NavbarButton = styled("button")`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => get(theme, "palette.background.paper")};
  border-radius: 4px;
  outline: none;
  border: none;
  padding: 10px 14px;

  color: ${({ theme }) => get(theme, "palette.text.primary")};
  svg path {
    fill: ${({ theme }) => get(theme, "palette.text.primary")};
  }
  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 900px) {
    &.mx-4 {
      margin: 0 10px !important;
    }
    padding: 8px 14px;
    font-size: 14px;
    span {
      margin-right: 5px !important;
    }
  }

  // for mobile menu bar
  &.menubar--btn {
    width: 100%;
    padding: 12px 22px;
    font-size: 16px;
  }
`;
