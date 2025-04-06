import styled from "@emotion/styled";
import get from "lodash.get";

export const ScrollTopStyled = styled("div")`
  background-color: ${({ theme }) => get(theme, "palette.background.light")};
  position: absolute;
  width: fit-content;
  border-radius: 8px;
  overflow: hidden;
  bottom: 150px;
  right: 4px;

  button.scroll-top-btn {
    outline: none;
    border: none;
    padding: 11px 13px;
    :hover {
      cursor: pointer;
    }
  }
`;
