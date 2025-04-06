import styled from "@emotion/styled";
import { DialogContent } from "@mui/material";
import get from "lodash.get";

export const PaidDialogContent = styled(DialogContent)`
  background-color: ${({ theme }) => get(theme, "palette.background.default")};
  .success-content {
    .success-title {
      color: ${({ theme }) => get(theme, "palette.text.info")};
    }
    .success-msg {
      line-height: 24px;
    }
  }
  .error-content {
    h2 {
      color: ${({ theme }) => get(theme, "palette.text.error")};
    }
  }
`;
