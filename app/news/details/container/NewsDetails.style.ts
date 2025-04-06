import styled from "@emotion/styled";
import get from "lodash.get";

export const NewsDetailsStyled = styled.div`
  h3.news-title {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    margin-bottom: 20px;
    color: ${({ theme }) => get(theme, "palette.text.main")};
    @media screen and (max-width: 900px) {
      font-size: 24px;
    }
    @media screen and (max-width: 600px) {
      font-size: 20px;
    }
  }
  .news-date-wrapper {
    @media screen and (max-width: 600px) {
      margin-bottom: 1rem !important;
    }
  }

  span.news-date {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    color: ${({ theme }) => get(theme, "palette.text.secondary")};
    @media screen and (max-width: 900px) {
      font-size: 16px;
    }
    @media screen and (max-width: 576px) {
      font-size: 14px;
    }
  }
  .read-count {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    @media screen and (max-width: 900px) {
      font-size: 16px;
    }
    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }
  .new-image {
    img {
      max-height: 500px;
      width: 100%;
      object-fit: cover;
      aspect-ratio: 2/1.1;
      border-radius: 8px;
    }
  }

  .news-description {
    color: ${({ theme }) => get(theme, "palette.text.main")};
  }

  .share-text {
    font-size: 18px;
    color: ${({ theme }) => get(theme, "palette.text.main")};
  }
  .text {
    color: ${({ theme }) => get(theme, "palette.text.main")};
  }
  ul.icon-list {
    li.icon-list-item {
      padding: 9px 11px;
      border-radius: 50%;
      @media screen and (max-width: 600px) {
        padding: 6px 8px;
      }
      &.facebook-icon {
        background-color: ${({ theme }) => get(theme, "palette.primary.light")};
        svg {
          path {
            fill: ${({ theme }) => get(theme, "palette.primary.main")};
          }
        }
      }
      &.instagram-icon {
        background: linear-gradient(
          180deg,
          rgba(250, 60, 60, 0.2) 0%,
          rgba(134, 12, 230, 0.2) 100%
        );
        svg {
          path {
            fill: linear-gradient(180deg, #fa3c3c 0%, #860ce6 100%);
          }
        }
      }
      &.telegram-icon {
        background-color: ${({ theme }) => get(theme, "palette.primary.light")};
        svg {
          path {
            fill: ${({ theme }) => get(theme, "palette.primary.main")};
          }
        }
      }
    }
  }
  .comment_box {
    margin: 2rem 0;
    padding: 20px;
    background-color: ${({ theme }) =>
      get(theme, "palette.background.commitBox")};
    border-radius: 8px;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .comment_list {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      justify-content: space-evenly;

      .comment_text {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        padding: 0.5rem 0;
        border-bottom: 1px solid #e0e0e0;
      }
    }

    .write_comment_box {
      form {
        width: 100%;
        display: flex;
        gap: 0.5rem;
        .send_message_input {
          flex: 1;
        }
        .comment_btn {
          height: 48px;
        }
      }
    }
  }
`;
