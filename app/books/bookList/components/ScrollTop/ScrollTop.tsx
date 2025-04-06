import React from "react";
import ArrowUpIcon from "@/assets/icons/ArrowUpIcon";
import { ScrollTopStyled } from "./ScrollTop.style";

const ScrollTop = () => {
  return (
    <ScrollTopStyled>
      <button
        type="button"
        className="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpIcon />
      </button>
    </ScrollTopStyled>
  );
};

export default ScrollTop;
