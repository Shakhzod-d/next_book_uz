import styled from "@emotion/styled";
import get from "lodash.get";

export const QuotesStyled = styled("div")`
  background: ${({ theme }: any) => theme?.palette?.background?.light};
  border-radius: 16px;
  @media screen and (max-width: 600px) {
    border-radius: 8px;
  }
  h2 {
    color: ${({ theme }) => get(theme, "palette.text.main")};
    @media screen and (max-width: 600px) {
      font-size: 20px;
    }
  }
`;
