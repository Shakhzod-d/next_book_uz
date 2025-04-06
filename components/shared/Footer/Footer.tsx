"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import LoactionIcon from "./assets/LoactionIcon";
import MailIcon from "./assets/MailIcon";
import PhoneIcon from "./assets/PhoneIcon";
import { FooterStyled } from "./Footer.style";
import GooglePlayImage from "../../../assets/images/GooglePlay.svg";
import AppStoreImage from "../../../assets/images/AppStore.svg";
import LogoBig from "../../../assets/images/LogoBig.svg";
import FacebookIcon from "../../../assets/icons/FacebookIcon";
import InstagramIcon from "../../../assets/icons/InstagramIcon";
import TelegramIcon from "../../../assets/icons/TelegramIcon";
import Image from "next/image";

const Footer = () => {
  const { t } = useTranslation();

  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <FooterStyled>
      <div className="container">
        <div className="footer-top">
          <Grid container justifyContent="start" rowSpacing={{ xs: 1 }}>
            <Grid item sm={6} md={3} xs={12} className="mb-3 ">
              <ul className="list-unstyled m-0 p-0 footer-item-1 pe-5">
                <div className="logo-group">
                  <li className="mb-3">
                    <Link href="/">
                      {/* <img src={LogoBig} alt="logo" /> */}
                      <Image src={LogoBig} alt="Logo" width={104} height={70} />
                    </Link>
                  </li>
                  <li className="mb-3">
                    <div className="footer-title">{t("HOME.BOOK_GIFT")}</div>
                  </li>
                </div>
                <li className="pe-4">
                  <div className="footer-msg">{t("HOME.FOOTER_MSG")}</div>
                </li>
              </ul>
            </Grid>

            <Grid item sm={6} md={3} xs={6} className="mb-3">
              <ul className="footer-items list-unstyled m-0 p-0">
                <li className="footer-item">
                  <div className="footerTitle">{t("FOOTER.MENU")}</div>
                </li>

                <li className="footer-item">
                  <a target="_blank" className="d-flex align-items-center">
                    {t("FOOTER.ABOUT_US")}
                  </a>
                </li>
                <li className="footer-item">
                  <a target="_blank" className="d-flex align-items-center">
                    {t("FOOTER.HOW_TO_BUY")}
                  </a>
                </li>
                <li className="footer-item">
                  <a target="_blank" className="d-flex align-items-center">
                    {t("FOOTER.DELIVERY")}
                  </a>
                </li>

                <li className="footer-item">
                  <a target="_blank" className="d-flex align-items-center">
                    {t("FOOTER.BRANCH_AND_DILER")}
                  </a>
                </li>
              </ul>
            </Grid>

            <Grid item sm={6} md={3} xs={6} className="mb-3">
              <ul className="footer-items list-unstyled m-0 p-0">
                <li className="footer-item">
                  <div className="footerTitle">{t("FOOTER.CONTACT_US")}</div>
                </li>

                <li className="footer-item">
                  <div className="d-flex  align-items-center phone-footer-content ">
                    <PhoneIcon />
                    <div>
                      <div className="footerPhoneNumber ms-3 mb-2">
                        <a href="tel:+998998910324">+998-99-891-03-24</a>
                      </div>
                      <div className="footerPhoneNumber ms-3 ">
                        <a href="tel:+998712300050">+998-71-230-00-50</a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="footer-item">
                  <a
                    target="_blank"
                    href={`mailto:info@book.uz`}
                    className="d-flex align-items-center"
                    rel="noreferrer"
                  >
                    <span>
                      <MailIcon />
                    </span>
                    <div className="mail ms-3">info@book.uz</div>
                  </a>
                </li>
                <li className="footer-item">
                  <a
                    target="_blank"
                    href="https://yandex.uz/maps/-/CCUNMJfAtC"
                    className="d-flex align-items-center"
                    rel="noreferrer"
                  >
                    <LoactionIcon />
                    <div className="ms-3">{t("FOOTER.ADDRESS")}</div>
                  </a>
                </li>
                <li className="footer-item">
                  <ul className="social-media  d-flex align-items-end  list-unstyled p-0 m-0">
                    <li className="social-media-item">
                      <a
                        href="https://facebook.com/bookuzbekistan"
                        className="text-decoration-none d-flex align-items-end  "
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FacebookIcon />
                      </a>
                    </li>
                    <li className="social-media-item mx-2">
                      <a
                        href="https://instagram.com/bookuzbekistan"
                        className="text-decoration-none d-flex align-items-end"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <InstagramIcon />
                      </a>
                    </li>
                    <li className="social-media-item ">
                      <a
                        href="https://t.me/bookuzbekistan"
                        className="text-decoration-none d-flex align-items-end"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <TelegramIcon />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </Grid>
            <Grid item sm={6} md={3} xs={12} className="mb-3">
              <ul className=" footer-items list-unstyled m-0 p-0">
                <li className="footer-item">
                  <div className="footerTitle">{t("FOOTER.DOWNLOAD_APP")}</div>
                </li>
                <li className="download-images">
                  <div
                    className="app-store-image mb-3"
                    onClick={() =>
                      window.open(
                        "https://apps.apple.com/uz/app/bookuz/id1642999533"
                      )
                    }
                  >
                    <Image
                      src={AppStoreImage}
                      alt="Download from App Store"
                      width={167}
                      height={65}
                    />
                  </div>
                  <div
                    className="google-play-image"
                    onClick={() =>
                      window.open(
                        "https://play.google.com/store/apps/details?id=uz.unical.bookuz"
                      )
                    }
                  >
                    <Image
                      src={GooglePlayImage}
                      alt="Download from Google Play"
                      width={188}
                      height={65}
                    />
                  </div>
                </li>
              </ul>
            </Grid>
          </Grid>
        </div>
        <div className="footer-bottom d-flex justify-content-between">
          <div>© {currentYear} Book.uz</div>
          <ul className="list-unstyled p-0 m-0 d-flex align-items-center">
            <li>
              <a href="">{t("FOOTER.COMMON_OFER")}</a>
            </li>
            <li className="ms-4">
              <a href="">{t("FOOTER.POLITIKA")}</a>
            </li>
          </ul>
        </div>
      </div>
    </FooterStyled>
  );
};

export default Footer;
