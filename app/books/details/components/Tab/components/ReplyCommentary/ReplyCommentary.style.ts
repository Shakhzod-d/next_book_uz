import styled from "@emotion/styled";
import get from "lodash.get";

export const ReplyCommentaryStyled = styled("div")`
  .reply-text {
    color: ${({ theme }) => get(theme, "palette.text.8282")};
    :hover {
      cursor: pointer;
    }
  }
  .reply-label {
    display: block;
    color: ${({ theme }) => get(theme, "palette.text.8282")};
    margin-bottom: 3px;
    font-size: 14px;
  }
  .reply-input {
    background-color: ${({ theme }) =>
      get(theme, "palette.background.default")};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => get(theme, "palette.grey.100")};
    padding: 12px;
    outline: none;
    min-width: 350px;
    font-size: 14px;
  }
  button {
    outline: none;
    border: none;
    border-radius: 4px;
    padding: 10px 16px;
    font-size: 13px;
    :hover {
      cursor: pointer;
    }
  }
  .reply-save-btn {
    color: ${({ theme }) => get(theme, "palette.text.info")};
    background-color: ${({ theme }) => get(theme, "palette.primary.light")};
  }
  .reply-cancel-btn {
    background-color: transparent;
    color: ${({ theme }) => get(theme, "palette.text.8282")};
  }
`;
