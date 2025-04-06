import React from "react";
import { NewsCardStyled } from "./NewsCard.style";
import { INewsCard } from "./NewsCard.types";
import { dateCovert } from "@/services/dateConvert/dateCovert";

const NewsCard: React.FC<INewsCard> = ({ news }) => {
  return (
    <NewsCardStyled imgUrl={process.env.NEXT_PUBLIC_BASE_URL + news.imgUrl}>
      <div className="news-box">
        <time className="news-date mb-2">{dateCovert(news.createdAt)}</time>
        <div className="news-title">{news.title}</div>
      </div>
    </NewsCardStyled>
  );
};

export default NewsCard;
