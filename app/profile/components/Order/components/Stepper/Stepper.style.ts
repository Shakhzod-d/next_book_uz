import styled from "@emotion/styled";
import get from "lodash.get";

export const StepperStyled = styled("div")`
  .page-title {
    font-weight: 600;
    font-size: 24px;
    @media screen and (max-width: 900px) {
      font-size: 20px;
    }
  }
  .MuiStepper-root.mui-stepper {
    @media screen and (max-width: 600px) {
      flex-wrap: wrap;
    }
    .MuiStep-root {
      @media screen and (max-width: 600px) {
        width: 30%;
        margin-bottom: 20px;
      }
      .step-icon {
        svg {
          @media screen and (max-width: 900px) {
            width: 40px;
            height: 40px;
          }
        }
      }
      .step-title {
        color: ${({ theme }) => get(theme, "palette.text.secondary")};
        padding-top: 1rem;
      }
      .step-time {
        display: block;
        color: ${({ theme }) => get(theme, "palette.text.secondary")};
      }
      .step-date {
        color: ${({ theme }) => get(theme, "palette.text.secondary")};
      }
      &.active {
        .step-title,
        .step-time,
        .step-date {
          color: ${({ theme }) => get(theme, "palette.active.info")};
        }
        .step-icon svg path {
          fill: ${({ theme }) => get(theme, "palette.active.info")};
        }
      }
    }
    .MuiStepConnector-root {
      @media screen and (max-width: 600px) {
        width: 40%;
        margin-bottom: 20px;
        :nth-child(4) {
          display: none;
        }
      }
    }
  }
  .MuiStepConnector-root {
    .MuiStepConnector-line {
      border-color: #a6a6a6;
      margin-top: -1rem;
    }
  }
`;
