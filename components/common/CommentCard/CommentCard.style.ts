import styled from "@emotion/styled";

export const CommentCardStyled = styled.div`
  transition: all 0.3s linear;

  /* img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 20px;
   } */

  .userName {
    font-size: 20px;
    color: ${({ theme }: any) => theme?.palette.text.secondary};
    font-weight: 500;
    margin-bottom: 8px;
    @media (max-width: 600px) {
      font-size: 16px;
    }
  }
  .rating {
    time {
      color: ${({ theme }: any) => theme?.palette.text.secondary};
      font-size: 13px;
      margin-left: 20px;
      font-weight: 600;
    }
  }
  .message {
    font-weight: 500;
    margin-bottom: 0;
    color: ${({ theme }: any) => theme?.palette.text.primary};
    @media (max-width: 600px) {
      font-size: 15px;
    }
  }
`;

export const CommentCardContent = styled.div`
  .replyMessage {
    padding-left: 40px;
  }
`;
