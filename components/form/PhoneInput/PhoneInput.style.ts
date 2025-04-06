import styled from "@emotion/styled";

export const MaskInputStyled = styled.div`
  .reactInputMask {
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
    color: ${({ theme }: any) => theme.palette?.text?.main};
    background-color: ${({ theme }: any) =>
      theme.palette?.background?.whiteInfo};

    border-bottom: 20px;
    border: 1px solid red;

    &::placeholder {
      color: ${({ theme }: any) => theme?.palette?.text?.primary};
    }

    &.error {
      border-color: ${({ theme }: any) =>
        theme?.palette?.error?.main} !important;
    }
    border-bottom: 8px;
  }
`;
