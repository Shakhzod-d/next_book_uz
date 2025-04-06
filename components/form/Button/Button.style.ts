import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const SaveButtonStyled = styled(Button)`
  padding: 11px 25px;
  border-radius: 8px;
  overflow: hidden;
  text-transform: capitalize;
  position: relative;
  @media screen and (max-width: 900px) {
    padding: 5px 20px !important;
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    padding: 7px 24px !important;
    font-size: 13px;
  }
  .buttonLoader {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    .backgroundOpacity {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: #fff;
      opacity: 0.4;
      z-index: 1;
    }
    .MuiCircularProgress-root.MuiCircularProgress-indeterminate {
      margin: 0 auto;
      color: #fff;
      width: 35px !important;
      height: 35px !important;
    }
  }
`;
