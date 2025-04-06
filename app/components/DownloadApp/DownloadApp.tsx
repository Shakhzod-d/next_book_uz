"use client";

import React, { useEffect, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
// import { useTranslation } from "react-i18next";
import AppStoreImage from "../../../assets/images/AppStore.svg";
import GooglePlayImage from "../../../assets/images/GooglePlay.svg";
import { DownloadAppStyled, DownloadAppWrapper } from "./DownloadApp.style";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Loader } from "@/components";

const DownloadApp = () => {
  const { t } = useTranslation();
  const matches = useMediaQuery("(max-width: 899px)");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  return (
    <DownloadAppWrapper className="mb-5">
      <DownloadAppStyled className="container">
        <Grid container>
          <Grid item xl={6} lg={7} md={12} className="custom-grid-1">
            <h1 className="mb-3 download-app-text">
              {t("HOME.DOWNLOAD_APP_TEXT")}
            </h1>
            <div className="d-flex ">
              <div className="me-3 download-app-img-wrap">
                <Image
                  src={AppStoreImage}
                  alt="App Store"
                  width={150}
                  height={50}
                  onClick={() =>
                    window.open(
                      "https://apps.apple.com/uz/app/bookuz/id1642999533"
                    )
                  }
                />
              </div>

              <div className="download-app-img-wrap">
                <Image
                  src={GooglePlayImage}
                  alt="Google Play"
                  width={150}
                  height={50}
                  onClick={() =>
                    window.open(
                      "https://play.google.com/store/apps/details?id=uz.unical.bookuz"
                    )
                  }
                />
              </div>
            </div>
          </Grid>
          {!matches && (
            <Grid item xl={6} lg={5}>
              <div className="bg-image">
                <div className="phone-image"></div>
              </div>
            </Grid>
          )}
        </Grid>
      </DownloadAppStyled>
    </DownloadAppWrapper>
  );
};

export default DownloadApp;
