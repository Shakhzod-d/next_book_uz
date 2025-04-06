import styled from "@emotion/styled";

export const LabelStyled = styled.label`
  font-size: 15px;
  color: ${({ theme }: any) => theme.palette?.text?.secondary};
  margin-bottom: 5px !important;
  display: block;
`;
