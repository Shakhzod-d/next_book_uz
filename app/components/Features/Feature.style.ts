import styled from "@emotion/styled";
import get from "lodash.get";

export const FeatureCardStyled = styled("div")`
  background: ${({ theme }) => get(theme, "palette.primary.light")};
  padding: 16px 24px 24px;
  border-radius: 8px;
  height: 100%;
  @media screen and (max-width: 600px) {
    display: flex;
    img.feature-img {
      margin-right: 15px;
    }
  }
  h3.feature-title {
    color: ${({ theme }) => get(theme, "palette.primary.main")};
    font-family: "Montserrat", sans-serif;
  }
  p.feature-msg {
    color: ${({ theme }) => get(theme, "palette.primary.main")};
  }
`;
