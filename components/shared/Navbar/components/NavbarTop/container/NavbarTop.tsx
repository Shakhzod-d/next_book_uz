"use client";

import React from "react";
import Logo from "../../../../../../assets/images/Logo.svg";
import { BookLabel, NavbarTopStyled, PurchaseText } from "./NavbarTop.style";
import { useTranslation } from "react-i18next";
import { ChangeLanguage, ModeSwitch, SearchPanel } from "../components";
import Link from "next/link";
import { useMediaQuery } from "@mui/material";
import MenuBar from "../components/MenuBar/MenuBar";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import TelegramIcon from "@/assets/icons/TelegramIcon";
import Image from "next/image";

const NavbarTop = () => {
  const { t } = useTranslation();

  const matches = useMediaQuery("(max-width:899px)");
  const matches700 = useMediaQuery("(max-width:700px)");

  return (
    <NavbarTopStyled className="d-flex justify-content-between align-items-end pb-3 pt-2">
      <div className="d-flex align-items-end">
        <Link href="/">
          {/* <img className=" logo me-4" src={Logo} alt="logo" /> */}
          <Image
            className="logo me-4"
            src={Logo}
            alt="logo"
            width={64}
            height={43}
          />
        </Link>
        {!matches700 && (
          <BookLabel className="my-0 me-5 label-text">
            {t("NAVBAR.BOOK_LABEL")}
          </BookLabel>
        )}

        {!matches700 && (
          <div className="d-flex align-items-end">
            <PurchaseText href="/" className="mb-0 text-underline">
              {t("NAVBAR.PURCHASE")}
            </PurchaseText>
          </div>
        )}
      </div>
      <ul className="list-unstyled d-flex align-items-end  m-0">
        <li className="mx-2">
          <SearchPanel />
        </li>
        {!matches700 && (
          <li className="d-flex align-items-end">
            <ChangeLanguage />
          </li>
        )}
        <li className={matches700 ? "mx-1" : ""}>
          <ModeSwitch />
        </li>
        {matches && (
          <li>
            <MenuBar />
          </li>
        )}

        {!matches && (
          <>
            <li className="mx-3">
              <a href="tel:+998712300050" className="phone-number font-500">
                +998 71 230 00 50
              </a>
            </li>
            <li className="ms-1">
              <ul className="d-flex align-items-end  list-unstyled p-0 m-0">
                <li>
                  <a
                    href="https://facebook.com/bookuzbekistan"
                    className="text-decoration-none d-flex align-items-end  "
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FacebookIcon />
                  </a>
                </li>
                <li className="mx-2">
                  <a
                    href="https://instagram.com/bookuzbekistan"
                    className="text-decoration-none d-flex align-items-end"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramIcon />
                  </a>
                </li>
                <li>
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
          </>
        )}
      </ul>
    </NavbarTopStyled>
  );
};

export default NavbarTop;
