import styled from "@emotion/styled";

export const MainImageCardStyled = styled("div")`
  overflow: hidden;
  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
  }

  .book-details-status {
    transform: rotate(-45deg);
    transform-origin: 70px 70px;
    position: absolute;
    z-index: 10;
    top: 30px;
    left: 0px;
    width: 190px;
    text-align: center;
    padding: 8px 0;
    color: #fff;
    border-radius: 0;
    font-size: 17px;
    background-color: red;
    letter-spacing: 0.1px;
    z-index: 20;
    @media (min-width: 0px) and (max-width: 600px) {
      padding: 2px 0;
      font-size: 13px;
      top: 20px;
      left: -11px;
    }
    &.bestseller {
      background-color: ${({ theme }: any) => theme?.palette?.warning?.main};
    }
    &.new {
      background-color: ${({ theme }: any) => theme?.palette?.error?.main};
    }
    &.popular {
      background-color: ${({ theme }: any) => theme?.palette?.primary?.main};
    }
  }

  .lazy-load-image-background {
    width: 100%;
    max-height: 540px;
    aspect-ratio: 392/542;
    @media (max-width: 1120px) {
      aspect-ratio: 360/500;
    }

    @media (max-width: 970px) {
      aspect-ratio: 300/450;
    }
    @media (max-width: 600px) {
    }
    img.main-image {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
`;
