import styled from "@emotion/styled";
import get from "lodash.get";

export const CircularLoaderContainer = styled("div")`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 999;
  background-color: ${({ theme }) => get(theme, "palette.background.default")};
`;
