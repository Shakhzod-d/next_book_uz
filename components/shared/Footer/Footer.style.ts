import styled from "@emotion/styled";
import get from "lodash.get";

export const FooterStyled = styled.div`
  overflow: hidden;
  margin-top: auto;
  color: ${({ theme }) => get(theme, "palette.secondary.contrastText")};
  background: ${({ theme }: any) => theme.palette.secondary.main};
  img {
    cursor: pointer;
  }
  .footer-top {
    padding-top: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid
      ${({ theme }: any) => theme?.palette?.common?.light};
    ul.footer-items {
      li.footer-item {
        margin-bottom: 18px;
        .footerTitle,
        .phone-footer-content,
        a {
          cursor: pointer;
          color: ${({ theme }) => get(theme, "palette.secondary.contrastText")};
          @media screen and (max-width: 600px) {
            font-size: 14px;
            svg {
              width: 23px;
              height: 23px;
            }
          }
        }
        .footerTitle {
          font-weight: 600;
          font-size: 18px;
          text-transform: uppercase;
          @media screen and (max-width: 600px) {
            font-size: 16px;
          }
        }
      }
      li.footer-item {
        ul.social-media {
          li.social-media-item {
            a {
              @media screen and (max-width: 600px) {
                /* font-size: 14px; */
              }
              cursor: pointer;
              svg {
                path {
                  fill: ${({ theme }) =>
                    get(theme, "palette.secondary.contrastText")};
                }
              }
            }
          }
        }
      }
      li.download-images {
        @media screen and (max-width: 600px) {
          display: flex;
          img {
            transform: scale(0.8);
          }
          img:first-of-type {
            margin-right: 20px;
          }
        }
      }
    }
    ul.footer-item-1 {
      .logo-group {
        @media screen and (max-width: 600px) {
          display: flex;
          align-items: center;
          & > li:first-of-type {
            margin-right: 20px;
          }
        }
      }
      li {
        div.footer-title {
          font-style: italic;
          font-weight: 500;
          font-size: 18px;
        }
        div.footer-msg {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          color: ${({ theme }: any) => theme.palette.grey["300"]};
        }
      }
    }
  }
  .footer-bottom {
    padding: 16px 0;
    ul {
      li {
        @media screen and (max-width: 600px) {
          font-size: 14px;
        }
        a {
          color: ${({ theme }) => get(theme, "palette.secondary.contrastText")};
        }
      }
    }
  }
`;
