import styled from "@emotion/styled";
import { Skeleton, Tabs } from "@mui/material";
import get from "lodash.get";

export const OrdersStyle = styled.div`
  .title {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    margin-left: 16px;
  }
`;

export const TabsStyled = styled(Tabs)`
  button.tab-item {
    background-color: ${({ theme }) => get(theme, "palette.background.light")};
    color: ${({ theme }) => get(theme, "palette.text.secondary")};
    padding: 10px 16px;
    border-radius: 4px;
    min-height: auto;
    font-size: 14px;
    border: none;
  }
  button.tab-item.Mui-selected {
    background-color: ${({ theme }) =>
      get(theme, "palette.mode") == "light"
        ? get(theme, "palette.background.warning")
        : "#FFDAB8"};
    color: ${({ theme }) => get(theme, "palette.active.warning")};
  }
  span.MuiTabs-indicator {
    display: none;
  }
`;

export const PageTitle = styled("h1")`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: ${({ theme }) => get(theme, "palette.text.black")};
  @media screen and (max-width: 900px) {
    font-size: 20px;
  }
`;

export const PageTitleSkleton = styled(Skeleton)`
  font-weight: 600;
  font-size: 24px;
  @media screen and (max-width: 900px) {
    font-size: 20px;
  }
`;
