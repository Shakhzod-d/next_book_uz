import styled from "@emotion/styled";

export const DeliveryCheckboxCard = styled("div")`
  border-radius: 8px;
  background-color: ${({ theme }: { theme: any }) =>
    theme.palette.background.paper};

  color: ${({ theme }: { theme: any }) => theme.palette.text.main};

  :hover {
    cursor: pointer;
  }
  border: 1px solid
    ${({ theme }: { theme: any }) =>
      theme?.palette.mode === "light"
        ? theme.palette.background.paper
        : "#2B4B80"};

  svg path {
    fill: ${({ theme }: any) =>
      theme?.mode == "light" ? "rgb(93, 93, 93)" : "#fff"};
  }
  &.active {
    background-color: ${({ theme }: { theme: any }) =>
      theme.palette.primary.light};
    color: ${({ theme }: { theme: any }) => theme.palette.primary.main};
    svg {
      path {
        fill: ${({ theme }: { theme: any }) => theme.palette.primary.main};
      }
    }
  }
`;
