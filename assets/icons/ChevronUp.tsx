import React from "react";

const ChevronUp = (props: any) => {
  return (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_446_5263)">
        <path
          d="M13.5034 10.1499L7.35342 3.9999C7.30853 3.95207 7.25431 3.91395 7.19411 3.88789C7.13392 3.86183 7.06901 3.84838 7.00342 3.84838C6.93782 3.84838 6.87292 3.86183 6.81272 3.88789C6.75253 3.91395 6.69831 3.95207 6.65342 3.9999L0.503418 10.1499"
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_446_5263">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(14.0034 14) rotate(-180)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ChevronUp;
