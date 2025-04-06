import styled from "@emotion/styled";

export const FilterStyled = styled.div`
  /* background: ${({ theme }: any) => theme?.palette?.background?.paper};
  border-radius: 24px;
  .MuiAccordionSummary-content.MuiAccordionSummary-contentGutters.css-o4b71y-MuiAccordionSummary-content {
    margin: 0;
  } */
`;

export const HeadAccordionStyled = styled("div")`
  & > .MuiPaper-root.MuiPaper-elevation {
    border-bottom: 1px solid ${({ theme }: any) => theme?.palette?.grey[600]};
    border-radius: 0;
    &.Mui-expanded {
      margin: 0 !important;
    }
    & > .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root.Mui-expanded {
      min-height: 48px;
      & > .css-o4b71y-MuiAccordionSummary-content.Mui-expanded {
        /* margin: 12px 0; */
      }
    }

    & > .MuiCollapse-root.MuiCollapse-vertical {
      padding: 0 20px !important;
    }
  }
  .MuiAccordionSummary-expandIconWrapper {
    transform: rotate(90deg);
  }
  .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    transform: rotate(180deg);
  }
`;

export const ChildAccordionStyled = styled("div")`
  & > .MuiPaper-root.MuiPaper-elevation {
    border-radius: 0 !important;
    box-shadow: none;
    &.Mui-expanded {
      margin: 0 !important;
    }
    & > .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root {
      height: 48px;
    }
    & > .css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root.Mui-expanded {
      min-height: 48px !important;
      height: 48px;
      & > .css-o4b71y-MuiAccordionSummary-content.Mui-expanded {
        margin: 12px 0;
      }
    }

    & > .MuiCollapse-root.MuiCollapse-vertical {
      padding: 0 20px !important;
    }
    &
      > .MuiButtonBase-root.MuiAccordionSummary-root.MuiAccordionSummary-gutters {
      padding: 0;
    }
  }
`;
