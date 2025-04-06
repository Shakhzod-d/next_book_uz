import styled from "@emotion/styled";
import get from "lodash.get";

export const VerifyStyled = styled("form")`
  h2.verify-title {
    font-size: 24px;
    @media screen and (max-width: 600px) {
      font-size: 20px;
    }
  }
  p.verify-msg {
    color: ${({ theme }) => get(theme, "palette.grey.400")};
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
  .auth-input {
    input {
      padding: 12px 16px;
      border: 1px solid #e7e7e7;
      border-radius: 8px;
    }
  }
  .verify-bottom-text {
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
  span.link-style {
    color: ${({ theme }) => get(theme, "palette.primary.main")};
    :hover {
      cursor: pointer;
    }
  }
`;
