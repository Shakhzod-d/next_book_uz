import styled from "@emotion/styled";
import get from "lodash.get";

export const CustomCheckboxStyled = styled("div")<{ mode: string }>`
  position: relative;
  margin-right: 8px;
  background-color: ${({ mode }) =>
    mode === "light" ? "transparent" : "#1F365B"};

  input.my-input {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    opacity: 0;
  }
  border: 1px solid ${({ theme }) => get(theme, "palette.warning.main")};
  border-radius: 4px;
  width: 20px;
  height: 20px;

  span.check-mark {
    position: absolute;
    top: 52%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    transition: all 0.2s linear;
    svg {
      opacity: 0;
      fill: ${({ theme }) => get(theme, "palette.warning.main")};
    }
  }
  input.my-input:checked ~ span.check-mark {
    svg {
      opacity: 1;
    }
  }
`;
