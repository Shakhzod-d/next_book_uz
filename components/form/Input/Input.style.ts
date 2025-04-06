import styled from "@emotion/styled";

export const StyledInput = styled.input`
  border-radius: 8px;
  border: 1px solid
    ${({ theme }: any) =>
      theme?.palette.mode == "light"
        ? theme?.palette?.grey[600]
        : "#2B4B80"} !important;
  box-sizing: border-box;
  width: 100%;
  padding: 14px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  outline: none;
  transition: all 300ms ease-out;
  background-color: ${({ theme }: any) => theme.palette?.background?.whiteInfo};
  color: ${({ theme }: any) => theme.palette?.text?.main};
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &::placeholder {
    color: ${({ theme }: any) => theme.palette?.text?.secondary};
  }
  &.error {
    border-color: ${({ theme }: any) => theme.palette?.error?.main} !important;
  }
`;
