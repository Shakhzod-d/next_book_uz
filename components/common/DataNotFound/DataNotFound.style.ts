import styled from "@emotion/styled";
import get from "lodash.get";

export const DataNotFoundText = styled("p")`
  color: ${({ theme }) => get(theme, "palette.text.main")};
  @media screen and (max-width: 600px) {
    font-size: 15px;
    padding: 1rem !important;
  }
`;
