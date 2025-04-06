import styled from "@emotion/styled";
import { Autocomplete } from "@mui/material";

export const AutoComplateStyled = styled(Autocomplete)<any>`
  .MuiFormControl-root.MuiFormControl-fullWidth.MuiTextField-root {
    border-radius: 8px;
    background: ${({ theme }: any) => theme.palette.background.whiteInfo};
    .MuiOutlinedInput-root.MuiInputBase-adornedEnd.MuiAutocomplete-inputRoot {
      padding: 0;
      .MuiOutlinedInput-input.MuiInputBase-input {
        width: 100% !important ;
        padding: 12.5px 14px;
      }
    }
    .MuiOutlinedInput-notchedOutline {
      border-radius: 8px;
      border: 1px solid
        ${({ theme }: any) =>
          theme?.palette.mode == "light"
            ? theme?.palette?.grey[600]
            : "#2B4B80"};
      padding: 13px;
    }
  }
  &.error {
    .MuiFormControl-root.MuiFormControl-fullWidth.MuiTextField-root {
      .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }: any) => theme.palette.error.main};
      }
    }
  }
`;
