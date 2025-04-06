import styled from "@emotion/styled";
import get from "lodash.get";

export const NewsContainer = styled("div")`
  @media screen and (max-width: 600px) {
    margin-bottom: 0 !important;
  }
  @media screen and (max-width: 900px) {
    margin-bottom: 10px !important;
  }
  h1.news-title {
    color: ${({ theme }) => get(theme, "palette.text.main")};
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    margin-bottom: 0;

    @media screen and (max-width: 900px) {
      font-size: 24px;
    }
    @media screen and (max-width: 600px) {
      font-size: 22px;
    }
  }
`;

export const NewsList = styled("ul")`
  margin: 0;
  padding: 0;
  list-style-type: none;
  justify-content: space-between;
  overflow-x: scroll;
  width: 100%;
  display: flex;
  li:not(:last-child) {
    padding-right: 15px;
  }
`;
