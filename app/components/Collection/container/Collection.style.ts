import styled from "@emotion/styled";
import get from "lodash.get";

export const CollectionContainer = styled("section")`
  background-color: ${({ theme }) => get(theme, "palette.background.paper")};
`;
