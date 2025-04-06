"use client";

import React from "react";
import { NavbarBottomStyled, NavbarButton } from "./NavbarBottom.style";
import { useTranslation } from "react-i18next";
import BasketIcon from "../../../../../../assets/icons/BasketIcon";
import HeartIcon from "../../../../../../assets/icons/HeartIcon";
import UserIcon from "../../../../../../assets/icons/UserIcon";
import { NAV_LINKS } from "./NavbarBottom.constants";
import { LayoutContext } from "@/layout/context";
import { Badge, useMediaQuery } from "@mui/material";
import { Category } from "../comaponents";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NavbarBottom = () => {
  const { t } = useTranslation();
  const router = useRouter();
  // const matchesMd = useMediaQuery("(max-width: 899px)");
  // const matchesXS = useMediaQuery("(max-width: 599px)");

  const {
    state: { isAuth, bookmarkCount, cartCount },
    actions: { setAuthOpen },
  } = React.useContext(LayoutContext);
  const useBtnClick = () => {
    if (isAuth) router.push("/profile");
    else setAuthOpen(true);
  };

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const matchesMd = useMediaQuery("(max-width: 899px)", { noSsr: true });
  const matchesXS = useMediaQuery("(max-width: 599px)", { noSsr: true });

  if (!mounted) return null;

  return (
    <NavbarBottomStyled>
      <div className="d-flex justify-content-between align-items-center py-3">
        {!matchesMd ? (
          <ul className="list-unstyled m-0 p-0 d-flex  align-items-center navs">
            {NAV_LINKS.map((nav) => (
              <li key={nav.path} className="me-4 nav-item">
                <Link href={nav.path + (nav.search || "")}>{t(nav.title)}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <Category />
        )}

        <ul className="list-unstyled m-0 p-0 d-flex align-items-center">
          <li>
            <Link href="/cart" className="d-flex align-items-center">
              <Badge badgeContent={cartCount} color="warning">
                <NavbarButton>
                  <span className="me-2">
                    <BasketIcon />
                  </span>
                  {t("BASKET.BASKET")}
                </NavbarButton>
              </Badge>
            </Link>
          </li>
          {!matchesXS && (
            <>
              <li className="">
                <Link href="/bookmark">
                  <Badge
                    className="mx-4"
                    badgeContent={bookmarkCount}
                    color="warning"
                  >
                    <NavbarButton className="d-flex align-items-center">
                      <span className="me-2">
                        <HeartIcon />
                      </span>
                      {t("NAVBAR.FAVORITES")}
                    </NavbarButton>
                  </Badge>
                </Link>
              </li>
              <li>
                <NavbarButton type="button" onClick={useBtnClick}>
                  <div className="d-flex align-items-center">
                    <span className="me-2">
                      <UserIcon />
                    </span>
                    {t("COMMON.PROFILE")}
                  </div>
                </NavbarButton>
              </li>
            </>
          )}
        </ul>
      </div>
    </NavbarBottomStyled>
  );
};

export default NavbarBottom;
