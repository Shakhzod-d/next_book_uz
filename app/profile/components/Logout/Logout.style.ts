import styled from "@emotion/styled";
import { Dialog } from "@mui/material";

export const DialogStyled = styled(Dialog)`
  &.logout-dialog {
    .MuiDialog-container {
      .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded {
        max-width: 450px;
        @media screen and (max-width: 900px) {
          font-size: 18px;
          border-radius: 16px;
          max-width: 400px;
        }
      }
    }
  }
`;

export const LogoutStyled = styled("div")`
  &.logout {
    h2.dialog-title {
      font-size: 24px;
      font-family: "Montserrat", sans-serif;
      line-height: 27px;
      @media screen and (max-width: 900px) {
        font-size: 18px;
      }
    }
    .logout-cancel-btn,
    .logout-save-btn {
      box-shadow: none !important;
      width: 100%;
      max-width: 180px;
      @media screen and (max-width: 900px) {
        padding: 10px 0;
        max-width: 120px;
      }
      .MuiTouchRipple-root {
        display: none !important;
      }
    }
    .logout-cancel-btn {
      background-color: ${({ theme }: any) =>
        theme.palette.background.b1b1} !important;
    }
    .logout-save-btn {
      background-color: ${({ theme }: any) => theme.palette.error.light};
    }
  }
`;
