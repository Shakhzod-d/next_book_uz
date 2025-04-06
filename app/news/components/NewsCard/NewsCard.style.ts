import styled from "@emotion/styled";
import get from "lodash.get";

export const NewsCardStyled = styled("div")<{ imgUrl: string }>`
  background-image: ${({ imgUrl }) => `url(${imgUrl})`};
  background-repeat: no-repeat;
  color: ${({ theme }) => get(theme, "palette.common.white")};
  padding: 16px;
  background-size: cover;
  border-radius: 8px;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: end;
  .news-box {
    time.news-date {
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.03em;
      opacity: 0.8;
    }
    div.news-title {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`;
