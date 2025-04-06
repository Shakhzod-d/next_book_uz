import styled from "@emotion/styled";

export const PublishingCardStyle = styled.div`
  transition: all linear 0.3s;
  &:hover {
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 20px 25px -5px,
      rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
  padding: 22px 5px;
  background: ${({ theme }: any) => theme?.palette?.background?.paper};
  border-radius: 16px;
  .publishing-name {
    font-size: 16px;
    padding: 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 18px;
    max-height: 35px;
    min-height: 35px;
  }
  .MuiGrid-root.MuiGrid-container {
    .publisher-card-loader {
      width: 90px;
      height: 90px;
    }
    img {
      width: 90px;
      height: 90px;
      object-fit: contain;
      @media screen and (max-width: 576px) {
        width: 75px;
        height: 75px;
      }
    }
  }
  p {
    line-height: 24px;
    font-weight: 500;
    @media screen and (max-width: 992px) {
      line-height: 22px;
    }
    @media screen and (max-width: 576px) {
      font-size: 15px;
      line-height: 18px;
    }
  }
`;
