import styled from "@emotion/styled";
import { Dialog } from "@mui/material";
import get from "lodash.get";

export const BookCommentStyled = styled.div`
  .add-comment-msg {
    color: ${({ theme }) => get(theme, "palette.text.secondary")};
    text-decoration: underline;
    :hover {
      cursor: pointer;
    }
  }
  .comment-dialog {
  }
`;

export const CommentDialog = styled(Dialog)`
  .MuiPaper-root.MuiPaper-elevation {
    background-color: ${({ theme }) =>
      get(theme, "palette.background.light")} !important;
  }
`;
