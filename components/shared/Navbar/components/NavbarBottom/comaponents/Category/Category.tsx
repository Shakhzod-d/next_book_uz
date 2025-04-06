"use client";

import { Dialog } from "@mui/material";
import CancelIcon from "../../../../../../../assets/icons/CancelIcon";
import MenuIcon from "../../../../../../../assets/icons/MenuIcon";
import React from "react";
import { useTranslation } from "react-i18next";
import NavbarTop from "../../../NavbarTop/container/NavbarTop";
import CategoryList from "../CategoryList/CategoryList";
import { CategoryButton } from "./Category.style";

const Category = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <CategoryButton
        type="button"
        className="me-2 d-flex align-items-center"
        onClick={handleClickOpen}
      >
        <span className="me-1">
          <MenuIcon width="20px" height="20px" />
        </span>

        {t("NAVBAR.CATEGORIES")}
      </CategoryButton>
      <Dialog fullScreen open={open} onClose={handleClose}>
        {open && (
          <div className="container">
            <NavbarTop />
            <div className="py-3">
              <CategoryButton
                type="button"
                className="d-flex align-items-center"
                onClick={handleClose}
              >
                <span className="me-1">
                  <CancelIcon width="20px" height="20px" />
                </span>

                {t("NAVBAR.CATEGORIES")}
              </CategoryButton>
            </div>
            <CategoryList handleClose={handleClose} />
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Category;
