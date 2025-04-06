import styled from "@emotion/styled";
import get from "lodash.get";

export const QuoteStyled = styled("section")`
  padding-top: 20px;
  .quote {
    box-shadow: rgba(0, 0, 0, 0.03) 0px 2px 25px;
    padding: 40px 70px;
    border-radius: 30px;
    background-color: ${({ theme }) => get(theme, "palette.background.paper")};
    @media screen and (max-width: 900px) {
      padding: 20px 35px;
    }
    @media screen and (max-width: 600px) {
      padding: 5px 20px;
    }
    .quote-top {
      border-bottom: 1px solid #ccc;
      padding-bottom: 20px;
      h1 {
        font-size: 70px;
        letter-spacing: 2px;
        font-family: "Roboto Mono", monospace;
        @media screen and (max-width: 900px) {
          font-size: 50px;
        }
        @media screen and (max-width: 600px) {
          font-size: 30px;
        }
      }
    }
    .quote-bottom {
      .author-name {
        font-size: 18px;
        text-align: end;
        font-weight: 500;
        @media screen and (max-width: 900px) {
          font-size: 17px;
        }
        @media screen and (max-width: 600px) {
          font-size: 14px;
        }
      }
    }
  }
`;
