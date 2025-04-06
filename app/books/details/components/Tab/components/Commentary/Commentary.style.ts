import styled from "@emotion/styled";
import get from "lodash.get";

export const BookReviewStyled = styled.div`
  background: ${({ theme }: any) => theme?.palette?.background?.light};
  border-radius: 16px;
  @media screen and (max-width: 900px) {
    border-radius: 8px;
  }

  .title {
    color: ${({ theme }) => get(theme, "palette.text.primary")};
    @media screen and (max-width: 600px) {
      font-size: 20px;
    }
  }
  .infiniteScrollComment {
    &::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }: any) => theme?.palette?.grey[600]};
      transition: all 0.2s;
    }

    border-bottom: 1px solid ${({ theme }: any) => theme?.palette?.grey[500]};
    height: 300px;
    overflow-y: auto;

    div {
      .commentItem {
        border-bottom: 1px solid #ddd;
      }
      .commentItem:last-child {
        border-bottom: none;
      }
    }
  }
`;
