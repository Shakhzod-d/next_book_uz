import styled from "@emotion/styled";

export const LoadMore = styled("button")`
  outline: none;
  background-color: transparent;
  border: none;
  width: 100%;
  position: relative;
  max-height: 390px;

  .lazy-load-image-background {
    width: 100%;
  }
  :hover {
    cursor: pointer;
  }

  img.load-more-image {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    max-height: 390px;
    vertical-align: middle;
    border-style: none;
    aspect-ratio: 1/1.5;
    @media screen and (max-width: 600px) {
      max-height: 250px;
    }
  }
`;
