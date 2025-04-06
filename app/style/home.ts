import styled from "@emotion/styled";
import get from "lodash.get";

export const MainContent = styled("div")`
  margin-top: 1.5rem;
  .main-page-title {
    color: ${({ theme }) => get(theme, "palette.text.primary")};
  }
  @media screen and (max-width: 900px) {
    margin-top: 1.5rem;
  }

  @media screen and (max-width: 700px) {
    margin-top: 0.7rem;
  }
  @media screen and (max-width: 576px) {
    margin-top: 0.5rem;
  }
`;
