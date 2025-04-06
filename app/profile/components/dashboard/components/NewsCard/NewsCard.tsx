"use client";

import React from "react";
import { NewsCardStyled } from "./NewsCard.style";
import { INewsCard } from "./NewsCard.types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { dateCovert } from "@/services/dateConvert/dateCovert";
// import { dateCovert } from "services/dateConvert/dateCovert";

const NewsCard: React.FC<INewsCard> = ({ news }) => {
  return (
    <NewsCardStyled>
      <LazyLoadImage
        effect="blur"
        src={process.env.NEXT_PUBLIC_BASE_URL + news.imgUrl}
        className="news-image mb-1"
        alt="iamge"
      />
      <time className="news-date">{dateCovert(news.createdAt)}</time>
      <h5 className="news-title font-500 mt-1">{news.title}</h5>
    </NewsCardStyled>
  );
};

export default NewsCard;
