import styled from "@emotion/styled";
import { TextAreaStyledType } from "./TextArea.types";

export const TextAreaStyled = styled.textarea<TextAreaStyledType>`
  border: 1px solid ${({ theme }: any) => theme?.palette?.grey[600]};
  border-radius: 12px;
  outline: none;
  padding: 15px;
  height: 150px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  background: ${({ theme }: any) => theme.palette.background.whiteInfo};
  color: ${({ theme }: any) => theme.palette?.text?.main};
  border: 1px solid
    ${({ theme }: any) =>
      theme?.palette.mode == "light" ? theme?.palette?.grey[600] : "#2B4B80"};
`;
