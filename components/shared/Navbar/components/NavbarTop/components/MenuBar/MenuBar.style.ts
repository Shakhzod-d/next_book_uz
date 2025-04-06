import styled from "@emotion/styled";
import { SwipeableDrawer } from "@mui/material";
import get from "lodash.get";

export const SwipeableDrawerStyled = styled(SwipeableDrawer)`
  .MuiPaper-root.MuiPaper-elevation.MuiDrawer-paper {
    width: 74%;
    background-color: ${({ theme }) =>
      get(theme, "palette.background.default")};
  }
`;

export const DrawerHeaderStyled = styled("div")`
  border-bottom: 1px solid ${({ theme }) => get(theme, "palette.border.grey")};
  div.drawer-cancel-icon {
    svg {
      path {
        fill: ${({ theme }) => get(theme, "palette.grey.500")};
      }
    }
  }
`;

export const DrawerContentStyled = styled("div")`
  a.drawer-phone-number {
    color: ${({ theme }) => get(theme, "palette.text.info")};
    font-size: 14px;
    font-weight: 500;
  }
  .social-media-list {
    padding-top: 5px;
    li {
      svg path {
        fill: ${({ theme }) => get(theme, "palette.grey.500")};
      }
    }
  }
  .nav-links {
    li {
      a {
        color: ${({ theme }) => get(theme, "palette.text.main")};
      }
    }
  }
`;
