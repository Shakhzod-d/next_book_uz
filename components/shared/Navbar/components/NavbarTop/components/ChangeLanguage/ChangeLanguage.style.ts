import styled from "@emotion/styled";
import { Select } from "@mui/material";

export const SelectStyled = styled(Select)`
  fieldset {
    border: none;
    padding: 0;
    font-family: 15px;
  }
  .MuiSelect-select {
    padding: 0;
  }
  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;
