import styled from "@emotion/styled";

export const SkletonListStyled = styled("div")`
  .book-image {
    width: 100%;
    height: 100%;
    max-height: 390px;
    vertical-align: middle;
    aspect-ratio: 1/1.5;
    @media screen and (max-width: 600px) {
      max-height: 250px;
    }
  }
  .MuiSkeleton-root.MuiSkeleton-rectangular.text {
    @media screen and (max-width: 600px) {
      height: 0.8em !important;
    }
  }
`;
