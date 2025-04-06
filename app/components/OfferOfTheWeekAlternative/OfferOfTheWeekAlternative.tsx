"use client";
import React, { useEffect } from "react";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { OfferOfTheWeekAlternativeCarouselStyled } from "./OfferOfTheWeekAlternative.style";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import get from "lodash.get";
import { Skeleton } from "@mui/material";
import { IBanner } from "@/types/common";
import ClientSlider from "@/components/common/ClientSlider/ClientSlider";

const OfferOfTheWeekAlternative = ({ type = 10 }: { type: number }) => {
  const [page, setPage] = React.useState(1);
  const [banners, setBanners] = React.useState<IBanner[]>([]);
  const slidesToShow = 1;
  const [isClick, setIsClick] = React.useState(false);

  const bannerClick = (bannerLink: string) => {
    !isClick && window.open(bannerLink);
  };

  const getBanners = async (p: number) => {
    try {
      const response = await axios.get(
        `banner?page=${p}&limit=10&type=${type}`
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getBanners/2", page, type],
    queryFn: () => getBanners(page),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    // onSuccess: (res) => {
    //   const bannerIds = banners.map((banner) => banner._id);
    //   const uniqueId: Set<string> = new Set(bannerIds);
    //   setBanners((prev) => {
    //     const filterArr = get(res, "data.data.data", []).filter(
    //       (banner: IBanner) => !uniqueId.has(banner._id)
    //     );
    //     return [...prev, ...filterArr];
    //   });
    //   uniqueId.clear();
    // }, // MUST CHECK LATER
  });

  useEffect(() => {
    if (data) {
      const newBanners = get(data, "data.data", []);
      setBanners((prev) => {
        const bannerIds = new Set(prev.map((banner) => banner._id));
        const filteredBanners = newBanners?.data?.filter(
          (banner: IBanner) => !bannerIds.has(banner._id)
        );
        return [...prev, ...filteredBanners];
      });
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

  return (
    <OfferOfTheWeekAlternativeCarouselStyled className="offer-of-the-week-alternative container">
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          className="slider-full-image-skeleton"
        />
      ) : (
        <Slider
          dots
          slidesToShow={slidesToShow}
          slidesToScroll={1}
          nextArrow={undefined}
          prevArrow={undefined}
          beforeChange={beforeChange}
          fade
          pauseOnHover
          autoplay
          infinite
          autoplaySpeed={10000}
        >
          {banners.map((banner, idx) => (
            <LazyLoadImage
              key={banner._id + idx}
              onMouseDown={() => setIsClick(false)}
              onMouseMove={() => setIsClick(true)}
              onClick={() => bannerClick(banner.link)}
              effect="blur"
              className="slider-full-image"
              src={process.env.NEXT_PUBLIC_BASE_URL + banner.imgUrl}
            />
          ))}
        </Slider>
      )}
    </OfferOfTheWeekAlternativeCarouselStyled>
  );
};

export default React.memo(OfferOfTheWeekAlternative);
