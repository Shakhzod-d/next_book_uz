"use client";

import React from "react";
import {
  DrawerContentStyled,
  DrawerHeaderStyled,
  SwipeableDrawerStyled,
} from "./MenuBar.style";
import Logo from "../../../../../../../assets/images/Logo.svg";
import ChangeLanguage from "../ChangeLanguage/ChangeLanguage";
import { PurchaseText } from "../../container/NavbarTop.style";
import { useTranslation } from "react-i18next";
import { NAV_LINKS } from "../../../NavbarBottom/container/NavbarBottom.constants";
import { Link, useNavigate } from "react-router-dom";
import { IDrawerHeader } from "./MenuBar.types";
import { NavbarButton } from "../../../NavbarBottom/container/NavbarBottom.style";
import { Badge, Grid, useMediaQuery } from "@mui/material";
import CancelIcon from "@/assets/icons/CancelIcon";
import { LayoutContext } from "@/layout/context";
import PhonoIcon from "@/assets/icons/PhonoIcon";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import TelegramIcon from "@/assets/icons/TelegramIcon";
import HeartIcon from "@/assets/icons/HeartIcon";
import UserIcon from "@/assets/icons/UserIcon";
import MenuIcon from "@/assets/icons/MenuIcon";

const DrawerHeader: React.FC<IDrawerHeader> = ({ onClose }) => {
  return (
    <DrawerHeaderStyled className="py-3 d-flex align-items-end justify-content-between">
      <div className="d-flex align-items-end">
        <img src={Logo} alt="logo" className="drawer-logo me-3" />
        <ChangeLanguage />
      </div>
      <div className="drawer-cancel-icon" onClick={onClose}>
        <CancelIcon width="18px" height="18px" />
      </div>
    </DrawerHeaderStyled>
  );
};

export const DrawerContent: React.FC<IDrawerHeader> = ({ onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const matchesXS = useMediaQuery("(max-width: 599px)");

  const {
    state: { isAuth, bookmarkCount },
    actions: { setAuthOpen },
  } = React.useContext(LayoutContext);

  const useBtnClick = () => {
    if (isAuth) {
      navigate("/profile");
      onClose();
    } else setAuthOpen(true);
  };

  return (
    <DrawerContentStyled className="py-3">
      <div className="d-flex align-items-center  justify-content-between">
        <a
          href="tel:+998712300050"
          className="drawer-phone-number d-flex align-items-center font-500"
        >
          <span className="me-2">
            <PhonoIcon />
          </span>
          +998 71 230 00 50
        </a>
        <ul className="d-flex align-items-end  social-media-list list-unstyled p-0 m-0">
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
      </div>
      {matchesXS && (
        <Grid container columnSpacing={4} className="pt-2 pb-1">
          <Grid item xs={6}>
            <Link to="/bookmark">
              <Badge badgeContent={bookmarkCount} color="warning">
                <NavbarButton
                  className="d-flex align-items-center menubar--btn"
                  onClick={onClose}
                >
                  <span className="me-2">
                    <HeartIcon />
                  </span>
                  {t("NAVBAR.FAVORITES")}
                </NavbarButton>
              </Badge>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <NavbarButton
              className="menubar--btn"
              type="button"
              onClick={useBtnClick}
            >
              <div className="d-flex align-items-center">
                <span className="me-2">
                  <UserIcon />
                </span>
                {t("COMMON.PROFILE")}
              </div>
            </NavbarButton>
          </Grid>
        </Grid>
      )}

      <div className="py-3">
        <PurchaseText href="/" className="mb-0 text-underline">
          {t("NAVBAR.PURCHASE")}
        </PurchaseText>
      </div>
      <ul className="list-unstyled p-0 m-0 nav-links ">
        {NAV_LINKS.map((nav) => (
          <li key={nav.path} className="mb-3">
            <Link to={nav.path + (nav.search || "")} onClick={onClose}>
              {t(nav.title)}
            </Link>
          </li>
        ))}
      </ul>
    </DrawerContentStyled>
  );
};

const MenuBar = () => {
  const [open, setOpen] = React.useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={onOpen} className="d-flex align-items-end">
        <MenuIcon />
      </div>
      <SwipeableDrawerStyled
        className="qwdqdwqdqwd"
        {...{
          anchor: "right",
          open,
          onClose,
          onOpen,
        }}
      >
        <div className="px-3">
          <DrawerHeader onClose={onClose} />
          <DrawerContent onClose={onClose} />
        </div>
      </SwipeableDrawerStyled>
    </div>
  );
};

export default MenuBar;
