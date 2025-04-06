import styled from "@emotion/styled";

export const ToTopBtnStyled = styled.button`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #ff9100;
  border: none;
  padding: 8px 10px;
  border-radius: 4px;
  display: none;
  cursor: pointer;
  z-index: 100000;
  svg {
    path {
      stroke: #fff;
      stroke-width: 2px;
    }
  }
`;
