import React, { Fragment, useState } from "react";
import "./CheckAnimation.css";
const CheckAnimation = () => {
  return (
    <Fragment>
      <svg
        width="100"
        height="100"
        className="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <g strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10">
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="26"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </g>
      </svg>
    </Fragment>
  );
};

export default CheckAnimation;
