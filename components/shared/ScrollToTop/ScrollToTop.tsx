"use client";

import { useEffect, useState } from "react";
import ChevronUp from "@/assets/icons/ChevronUp";
import { ToTopBtnStyled } from "./ScrollToTop.style";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollFunction = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", scrollFunction);
    return () => window.removeEventListener("scroll", scrollFunction);
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ToTopBtnStyled
      onClick={backToTop}
      type="button"
      className="btn btn-warning btn-floating btn-md"
      id="btn-back-to-top"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <ChevronUp />
    </ToTopBtnStyled>
  );
}

export default ScrollToTop;
