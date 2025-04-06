import styled from "@emotion/styled";

export const AppStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }: any) => theme?.palette?.background?.default};
  overflow-x: hidden;
`;
