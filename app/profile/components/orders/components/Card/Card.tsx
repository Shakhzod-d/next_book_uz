import React from "react";
import { useTranslation } from "react-i18next";
import { CardStyled, StatusButton } from "./Card.style";
import { ICard } from "./Card.types";
import formatter from "@/services/formatter";
import get from "lodash.get";
import { ORDER_STATUS_COLORS } from "./Card.constants";
import { dateCovert } from "@/services/dateConvert/dateCovert";

const Card: React.FC<ICard> = ({ order }) => {
  const { t } = useTranslation();

  return (
    <CardStyled className="p-3">
      <div className="d-flex justify-content-between card-top mb-3">
        <p className="order-number">
          {t("PROFILE.ORDER")} № {get(order, "number", "")}
        </p>
        <time className="order-date">
          {dateCovert(get(order, "createdAt", ""))}
        </time>
      </div>
      <div className="d-flex justify-content-between align-items-end card-bottom">
        <StatusButton
          {...ORDER_STATUS_COLORS[
            get(order, "status") as keyof typeof ORDER_STATUS_COLORS
          ]}
        >
          {t(
            ORDER_STATUS_COLORS[
              get(order, "status") as keyof typeof ORDER_STATUS_COLORS
            ].text
          )}
        </StatusButton>
        <p className="book-price">{formatter(order?.total)} so‘m</p>
      </div>
    </CardStyled>
  );
};

export default Card;
