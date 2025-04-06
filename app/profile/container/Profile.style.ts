import styled from "@emotion/styled";
import get from "lodash.get";

export const ProfileStyle = styled.div`
  @media screen and (max-width: 600px) {
    margin-bottom: 0 !important;
  }
  .card {
    background-color: ${({ theme }: any) => theme.palette.background.light};
    border-radius: 8px;
    @media screen and (max-width: 900px) {
      margin-bottom: 1.5rem;
    }
    .header {
      @media screen and (max-width: 900px) {
        padding-right: 20px;
      }
      @media screen and (max-width: 600px) {
        padding-right: 0;
      }
      .photos {
        position: relative;
        .photos-loader {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          .photos-loader-background {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            position: absolute;
            background: #fff;
            opacity: 0.6;
          }
          span {
            width: 25px !important;
            height: 25px !important;
          }
        }
        .profile-img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
        }
        input#user-upload {
          width: 0;
          height: 0;
          opacity: 0;
          z-index: 20;
        }
        .upload-content {
          background-color: #fff;
          position: absolute;
          right: 0;
          width: 28px;
          height: 28px;
          bottom: 0;
          border-radius: 50%;
          .camera {
            cursor: pointer;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      h3.fullname {
        font-family: Montserrat, sans-serif;
        font-size: 18px;
        color: ${({ theme }: any) => theme.palette.text.black};
        @media screen and (max-width: 900px) {
          font-size: 14px;
        }
        @media screen and (max-width: 600px) {
          font-size: 18px;
          font-weight: 500 !important;
        }
      }
      p {
        font-weight: 500;
        color: ${({ theme }: any) => theme.palette.text.black};
        @media screen and (max-width: 900px) {
          font-size: 14px;
        }
        @media screen and (max-width: 600px) {
          font-size: 16px;
        }
      }
    }
    .line-warpper {
      @media screen and (max-width: 900px) {
        display: none;
      }
      @media screen and (max-width: 600px) {
        display: block;
      }
      .line {
        height: 1px;
        background-color: #000000;
        opacity: 0.1;
        margin: 15px 0;
      }
    }

    .footer {
      @media screen and (max-width: 900px) {
        border-left: 1px solid #dbdbdb;
        padding-left: 20px;
      }
      @media screen and (max-width: 600px) {
        border: none;
        padding-left: 0;
      }
      .list-item.list-item-active {
        span {
          color: ${({ theme }) =>
            get(theme, "palette.warning.main")} !important;
        }
        svg.stroke {
          path {
            stroke: ${({ theme }) =>
              get(theme, "palette.warning.main")} !important;
          }
        }
        svg.fill {
          path {
            fill: ${({ theme }) =>
              get(theme, "palette.warning.main")} !important;
          }
        }
      }
      .list-item {
        cursor: pointer;
        margin-top: 14px;
        span {
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          color: ${({ theme }) => get(theme, "palette.text.black")};
          margin-left: 12px;
          transition: all 0.3s ease-in-out;
        }
        svg {
          path {
            transition: all 0.3s ease-in-out;
          }
          &.fill {
            path {
              fill: ${({ theme }) =>
                get(theme, "palette.text.black")} !important;
            }
          }

          &.stroke {
            path {
              stroke: ${({ theme }) =>
                get(theme, "palette.text.black")} !important;
            }
          }
        }

        &:hover {
          span {
            color: ${({ theme }) =>
              get(theme, "palette.warning.main")} !important;
          }
          svg.stroke {
            path {
              stroke: ${({ theme }) =>
                get(theme, "palette.warning.main")} !important;
            }
          }
          svg.fill {
            path {
              fill: ${({ theme }) =>
                get(theme, "palette.warning.main")} !important;
            }
          }
        }
      }

      .list-item.leave {
        span {
          color: ${({ theme }) => get(theme, "palette.text.secondary")};
        }
        svg {
          path {
            fill: ${({ theme }) =>
              get(theme, "palette.text.secondary")} !important;
          }
        }
      }

      hr.line {
        background-color: ${({ theme }) => get(theme, "palette.text.black")};
        opacity: 0.3;
        height: 1px;
        @media screen and (max-width: 900px) {
          display: none;
        }
        @media screen and (max-width: 600px) {
          display: block;
        }
      }
    }
  }

  .tab-content {
    border-radius: 8px;
    background-color: transparent;
  }
`;
