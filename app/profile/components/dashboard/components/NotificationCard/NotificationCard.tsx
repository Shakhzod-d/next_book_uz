import { Button } from "@mui/material";
import React, { FC } from "react";
import { NotificationCardStyled } from "./NotificationCard.style";
import { IComment } from "@/components/common/CommentCard/Comment.types";
import get from "lodash.get";
import { dateCovert } from "@/services/dateConvert/dateCovert";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../../../assets/images/Logo.svg";
import { useMemo } from "react";

const NotificationCard: FC<{ notification: IComment }> = ({ notification }) => {
  const navigate = useNavigate();

  const imageUrl = useMemo(() => {
    if (get(notification, "user.imgUrl")) {
      return (
        !process.env.NEXT_PUBLIC_BASE_URL + get(notification, "user.imgUrl")!
      );
    }
    return Logo;
  }, [notification]);
  return (
    <NotificationCardStyled className="p-3">
      <div className="notification-header  d-flex align-items-center  mb-2">
        <div className="user-image">
          <img src={imageUrl} alt={get(notification, "user.firstName")} />
        </div>
        <div className="notification-username mx-2">
          {get(notification, "user.firstName")}
        </div>
        <div className="notification-additional-text">
          izohingizga javob yozdi
        </div>
      </div>
      <div className="mb-3 notification-date">
        {dateCovert(notification?.createdAt)}
      </div>
      {notification?.message && (
        <div className="order-question mb-2">{notification?.message}</div>
      )}

      <div className="order-msg mb-4">
        {get(notification, "user.message", "")}
      </div>
      <Button
        className="view-notification-btn"
        onClick={() =>
          navigate(`/books/details/${notification?.bookId}`, {
            state: "commentary",
          })
        }
      >
        Izohlarda ko‘rish
      </Button>
    </NotificationCardStyled>
  );
};

export default NotificationCard;
