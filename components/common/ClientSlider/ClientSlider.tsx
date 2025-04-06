"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ClientSlider({ children, settings }: any) {
  return <Slider {...settings}>{children}</Slider>;
}
