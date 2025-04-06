"use client";

import React from "react";
import { Grid } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PublishingCardStyle } from "./PublishingCard.style";
import { IPublishingCardProps } from "./PublishingCard.types";
import get from "lodash.get";
import { publishingImageCheck } from "../../utils/publishingImageCheck/publishingImageCheck";

const PublishingCard = ({ publishing }: IPublishingCardProps) => {
  return (
    <PublishingCardStyle>
      <Grid container justifyContent="center">
        <LazyLoadImage
          effect="blur"
          src={publishingImageCheck(publishing.imgUrl) as any} // MUST CHECK LATER
          alt={get(publishing, "name")}
        />
      </Grid>
      <p className="text-center publishing-name">{get(publishing, "name")}</p>
    </PublishingCardStyle>
  );
};

export default PublishingCard;
