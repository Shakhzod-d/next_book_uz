import styled from "@emotion/styled";
import get from "lodash.get";

export const BookDescriptionStyled = styled("div")`
  background-color: ${({ theme }) => get(theme, "palette.background.light")};
  border-radius: 16px;
  color: ${({ theme }) => get(theme, "palette.text.main")};
  h1.book-description-title {
    font-size: 24px;
    @media (max-width: 600px) {
      font-size: 20px;
    }
  }
`;
