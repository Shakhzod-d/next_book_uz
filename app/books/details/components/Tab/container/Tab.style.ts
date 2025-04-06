import styled from "@emotion/styled";
import { Tabs } from "@mui/material";
import get from "lodash.get";

export const TabsStyled = styled(Tabs)`
  button.tab-item {
    color: ${({ theme }) => get(theme, "palette.text.5656")};
    padding: 12px 20px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => get(theme, "palette.text.5656")};
    min-height: auto;
  }
  button.tab-item.Mui-selected {
    background-color: ${({ theme }) => get(theme, "palette.warning.main")};
    color: ${({ theme }) => get(theme, "palette.warning.contrastText")};
    border-color: ${({ theme }) => get(theme, "palette.warning.main")};
  }
  span.MuiTabs-indicator {
    display: none;
  }
`;
