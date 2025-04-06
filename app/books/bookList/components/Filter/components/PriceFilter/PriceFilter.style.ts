import styled from "@emotion/styled";
import { Slider } from "@mui/material";
import get from "lodash.get";

export const PriceSlider = styled(Slider)`
  span.MuiSlider-rail {
    // width: 100px !important;
    background-color: ${({ theme }) => get(theme, "palette.warning.main")};
    height: 3px;
  }
  span.MuiSlider-track {
    background-color: ${({ theme }) => get(theme, "palette.warning.main")};
    border-color: ${({ theme }) => get(theme, "palette.warning.main")};
    height: 3px;
    box-shadow: none;
    border: none !important;
  }
  span.MuiSlider-thumbColorPrimary {
    width: 25px;
    height: 25px;
    background-color: ${({ theme }) => get(theme, "palette.info.main")};
    box-shadow: none;
    .MuiSlider-valueLabel {
      background-color: ${({ theme }) => get(theme, "palette.primary.main")};
    }
  }
  .MuiSlider-thumbColorPrimary.MuiSlider-thumb {
    ::before {
      box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15) !important;
    }
  }
`;
