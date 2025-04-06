import styled from "@emotion/styled";

export const ErrorMessageStyled = styled.div`
  font-size: 13px;
  margin: 5px 0;
  color: ${({ theme }: any) => theme?.palette?.error?.main};
`;
