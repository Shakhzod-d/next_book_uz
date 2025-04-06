import React from "react";
import "./Marquee.css";

declare namespace JSX {
  interface IntrinsicElements {
    marquee: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLMarqueeElement>,
      HTMLMarqueeElement
    >;
  }
}

const TechnicalWorkNotice = () => {
  return (
    <>
      <div className="marquee-container">
        <div className="marquee">
          <span>
            Biz hozirda texnik ishlarni olib bormoqdamiz. Noqulayliklar uchun
            uzr so'raymiz.
          </span>
        </div>
      </div>
    </>
  );
};

export default TechnicalWorkNotice;
