import { Button } from "@/components";
import styled from "@emotion/styled";
import { ButtonProps } from "@mui/material";

// export const AllNewsButton = styled(Button)`
//   padding: 6px 20px;
// `;

interface IAllNewsButtonProps extends ButtonProps {
  value: string;
}

export const AllNewsButton = styled(Button)<IAllNewsButtonProps>(
  ({ theme }: { theme: any }) => ({
    marginLeft: theme.spacing(2),
  })
);
