import styled from "@emotion/styled";
import get from "lodash.get";

export const TopOfMonthContainer = styled("section")`
  background-color: ${({ theme }) => get(theme, "palette.background.paper")};
  padding-bottom: 80px;
`;

export const TopOfMonthStyled = styled("div")`
  &.top-of-month {
    position: relative;
    h1.top-of-month-title {
      font-weight: 600;
      font-size: 28px;
      color: ${({ theme }) => get(theme, "palette.text.main")};
      @media screen and (max-width: 900px) {
        font-size: 24px;
      }
      @media screen and (max-width: 600px) {
        font-size: 22px;
      }
    }
    .slick-slider.slick-initialized {
      .slick-list {
        .slick-track {
          margin-left: 0 !important;
          padding-top: 45px;
          @media screen and (max-width: 900px) {
            padding-top: 25px;
          }
          @media screen and (max-width: 900px) {
            padding-top: 15px;
          }
        }
      }
    }
    button.slick-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: auto;
      height: auto;
      background-color: ${({ theme }) =>
        get(theme, "palette.background.default")};
      backdrop-filter: blur(5px);
      padding: 12px;
      border-radius: 50%;
      top: -25px;
      &.slick-disabled {
        opacity: 0.6;
      }
      @media screen and (max-width: 600px) {
        padding: 8px;
        top: -20px;
      }
      &:hover {
        cursor: pointer;
      }

      &::before {
        display: none !important;
      }
    }

    button.slick-prev {
      right: 77px;
      left: auto;
      @media screen and (max-width: 600px) {
        right: 60px;
      }
    }
    button.slick-next {
      right: 30px;
      @media screen and (max-width: 600px) {
        right: 20px;
      }
    }
  }
`;
