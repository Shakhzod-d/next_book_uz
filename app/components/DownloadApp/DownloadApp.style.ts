import styled from "@emotion/styled";
import get from "lodash.get";
import PhoneImage from "../../../assets/images/Phone.png";

export const DownloadAppWrapper = styled("section")`
  padding-top: 120px;

  @media screen and (max-width: 900px) {
    padding-top: 60px;
  }

  @media screen and (max-width: 600px) {
    padding-top: 20px;
  }
`;

export const DownloadAppStyled = styled("div")`
  background-color: ${({ theme }) => get(theme, "palette.warning.main")};
  border-radius: 24px;
  padding: 36px 77px;
  position: relative;
  min-height: 310px;
  @media screen and (max-width: 900px) {
    min-height: auto;
    padding: 20px;
  }
  .custom-grid-1 {
    padding-right: 80px;
    @media screen and (max-width: 900px) {
      padding-right: 0;
    }
  }
  .download-app-img-wrap {
    max-width: fit-content !important;
    max-height: fit-content !important;
    img {
      cursor: pointer;
      @media screen and (max-width: 600px) {
        transform: scale(0.7);
      }
    }
    @media screen and (max-width: 600px) {
      &:first-of-type {
        margin-right: 1px !important;
      }
    }
  }

  div.bg-image {
    left: 50%;
    transform: translateX(33%);
    bottom: -52px;
    position: absolute;
    div.phone-image {
      height: 460px;
      width: 400px;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url(${PhoneImage.src});
      @media screen and (max-width: 1200px) {
        height: 398px;
        width: 340px;
      }
    }
  }

  h1.download-app-text {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 140%;
    text-transform: uppercase;
    color: ${({ theme }) => get(theme, "palette.warning.contrastText")};
    @media screen and (max-width: 1200px) {
      max-width: 65%;
    }
    @media screen and (max-width: 900px) {
      max-width: 100%;
      font-size: 28px;
    }
    @media screen and (max-width: 600px) {
      font-size: 22px;
    }
  }
`;
