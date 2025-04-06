import styled from "@emotion/styled";
import get from "lodash.get";

export const AuthorCardStyled = styled.div`
  background: ${({ theme }: any) => theme?.palette.background.light};
  border-radius: 8px;
  padding: 24px;
  width: 100%;

  @media screen and (max-width: 600px) {
    padding: 16px 8px;
  }
  .skeleton-right {
    width: 100%;
  }
  .skeleton-left {
    width: calc(120px + 30);
    @media screen and (max-width: 900px) {
      width: calc(80px + 30);
    }
    @media screen and (max-width: 600px) {
      width: calc(60px + 30);
    }
  }

  .author-name {
    color: ${({ theme }) => get(theme, "palette.text.main")};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 0 0 8px 0;
    font-weight: 600;
    font-size: 24px;
    font-family: "Montserrat", sans-serif;
    @media screen and (max-width: 900px) {
      font-size: 20px;
    }
    @media screen and (max-width: 600px) {
      font-size: 18px;
    }
  }
  .years {
    margin: 0 0 22px 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #000000;
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }

  .author-img {
    border-radius: 50%;
    object-fit: cover;
    margin-right: 28px;
    width: 120px;
    height: 120px;
    aspect-ratio: 1/1;
    @media screen and (max-width: 900px) {
      width: 80px;
      height: 80px;
    }
    @media screen and (max-width: 600px) {
      width: 60px;
      height: 60px;
    }
  }

  .book-number {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: ${({ theme }: any) => theme?.palette.primary.main};
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
`;
