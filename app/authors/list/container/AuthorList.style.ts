import styled from "@emotion/styled";
import get from "lodash.get";

export const AuthorListStyled = styled.div`
  .author-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    list-style-type: none;
    margin: 0;
    @media screen and (max-width: 1362px) {
      justify-content: space-around;
    }
  }

  .main-page-title {
    color: ${({ theme }) => get(theme, "palette.text.primary")};
  }

  .author-heading {
    margin: 0 0 24px 0;
    font-weight: 600;
    font-size: 28px;
    line-height: 130%;

    @media screen and (max-width: 600px) {
      font-size: 20px;
    }
  }
`;
