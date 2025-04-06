"use client";

import get from "lodash.get";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Slider from "react-slick";
import {
  MainCarouselSkletonStyled,
  SlickCarouselStyled,
} from "./MainCarousel.style";
import { useQuery } from "@tanstack/react-query";
import PreviosIcon from "@/assets/icons/PreviosIcon";
import NextIcon from "@/assets/icons/NextIcon";
import { IBanner } from "@/types/common";
import { axiosInstance } from "@/services/api/client";

const RenderPrevButton = ({ currentSlide, slideCount, ...rest }: any) => {
  return (
    <button className="slick-arrow slick-prev" {...rest}>
      <PreviosIcon />
    </button>
  );
};

const RenderNextButton = ({ currentSlide, slideCount, ...rest }: any) => {
  return (
    <button className="slick-arrow slick-next" {...rest}>
      <NextIcon />
    </button>
  );
};

const MainCarousel = () => {
  const [page, setPage] = React.useState(1);
  const [banners, setBanners] = React.useState<IBanner[]>([]);
  const slidesToShow = 1;
  const [isClick, setIsClick] = React.useState(false);

  const bannerClick = (bannerLink: string) => {
    !isClick && window.open(bannerLink);
  };

  const getBanners = async (p: number) => {
    try {
      const response = await axiosInstance.get(
        `banner?page=${p}&limit=10&type=10`
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getBanners/1", page],
    queryFn: () => getBanners(page),
  });

  React.useEffect(() => {
    if (data) {
      const bannerIds = banners.map((banner) => banner._id);
      const uniqueId: Set<string> = new Set(bannerIds);

      setBanners((prev) => {
        const filterArr = get(data, "data.data.data", []).filter(
          (banner: IBanner) => !uniqueId.has(banner._id)
        );
        return [...prev, ...filterArr];
      });

      uniqueId.clear();
    }
  }, [data]);

  const beforeChange = (currentSlideIndex: number) => {
    if (
      banners.length - 2 - slidesToShow === currentSlideIndex &&
      get(data, "data.data.total") > banners.length
    ) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading)
    return (
      <MainCarouselSkletonStyled
        sx={{ borderRadius: "8px" }}
        variant="rectangular"
        height="480px"
        animation="wave"
      />
    );

  return (
    <SlickCarouselStyled className="main-carousel">
      <Slider
        dots
        slidesToShow={slidesToShow}
        slidesToScroll={1}
        infinite
        nextArrow={<RenderNextButton />}
        fade
        prevArrow={<RenderPrevButton />}
        centerPadding="20px"
        beforeChange={beforeChange}
        pauseOnHover
        autoplay
        autoplaySpeed={10000}
      >
        {banners.map((banner, index) => (
          <div key={banner._id + index}>
            <div
              className="carouselItem"
              data-value={index}
              id={banner._id}
              onClick={() => bannerClick(banner.link)}
              onMouseDown={() => setIsClick(false)}
              onMouseMove={() => setIsClick(true)}
            >
              <LazyLoadImage
                src={process.env.NEXT_PUBLIC_BASE_URL + banner.imgUrl}
                alt={banner.title}
                effect="blur"
                id={banner._id}
              />
            </div>
          </div>
        ))}
      </Slider>
    </SlickCarouselStyled>
  );
};

export default MainCarousel;
