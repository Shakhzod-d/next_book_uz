import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import get from "lodash.get";

export const FilterButton = styled(Button)`
  border-radius: 9px;
  padding: 5px 30px;
  font-size: large;
  @media screen and (max-width: 600px) {
    min-width: 100px;
    width: 30%;
    font-size: 1rem;
  }
  .additional-filter {
    position: relative;
    z-index: 1000;
  }
`;
export const BookListStyled = styled.div`
  .main-page-title {
    color: ${({ theme }) => get(theme, "palette.text.primary")};
  }
`;
