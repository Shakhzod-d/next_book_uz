import styled from "@emotion/styled";
import get from "lodash.get";

export const NewsCardStyled = styled("div")`
  .lazy-load-image-background {
    width: 100% !important;
  }
  img.news-image {
    border-radius: 4px;
    aspect-ratio: 1/1;
    width: 100%;
    object-fit: fill;
  }
  time.news-date {
    color: ${({ theme }) => get(theme, "palette.text.black")};
    opacity: 0.8;
    font-size: 12px;
  }
  h5.news-title {
    color: ${({ theme }) => get(theme, "palette.text.black")};
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;
