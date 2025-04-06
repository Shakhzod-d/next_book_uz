import styled from "@emotion/styled";
import get from "lodash.get";

export const LoginStyled = styled("form")`
  h2.login-title {
    font-size: 24px;
    @media screen and (max-width: 600px) {
      font-size: 20px;
    }
  }
  p.phone-number-msg {
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
  .login-botton-text {
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
  span.link-style {
    color: ${({ theme }) =>
      get(theme, "palette.mode") == "light"
        ? get(theme, "palette.primary.main")
        : "#8AC7FF"};

    :hover {
      cursor: pointer;
    }
  }
`;
