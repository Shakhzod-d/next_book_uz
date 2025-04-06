import styled from "@emotion/styled";
import get from "lodash.get";

export const QuoteCardStyled = styled("div")`
  border-top: 1px solid #d9d9d9;
  div.quote-author {
    color: ${({ theme }: any) => theme?.palette?.text["8282"]};
    @media screen and (max-width: 600px) {
      font-size: 16px;
    }
  }
  div.quote-msg {
    color: ${({ theme }) => get(theme, "palette.text.main")};
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
`;
