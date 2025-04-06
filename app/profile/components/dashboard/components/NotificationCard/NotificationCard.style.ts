import styled from "@emotion/styled";

export const NotificationCardStyled = styled("div")`
  background-color: ${({ theme }: any) => theme.palette.background.light};
  border-radius: 8px;
  /* height: 100%; */
  .notification-header {
    .user-image {
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
    .notification-username {
      font-weight: 600;
      color: ${({ theme }: any) => theme.palette.text.main};
    }
    .notification-additional-text {
      color: ${({ theme }: any) => theme.palette.text.primary};
    }
  }
  .notification-date {
    color: ${({ theme }: any) => theme.palette.text["8282"]};
  }
  .order-question {
    color: ${({ theme }: any) => theme.palette.text["8282"]};
  }
  .order-msg {
    color: ${({ theme }: any) => theme.palette.text.primary};
  }
  .view-notification-btn {
    background: rgba(16, 127, 228, 0.2);
    border-radius: 4px;
    padding: 5px 15px;
  }
`;
