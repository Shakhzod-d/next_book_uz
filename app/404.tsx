import Lottie from "react-lottie";
import styled from "@emotion/styled";
import notFoundJson from "../assets/not-found.json";
import { Suspense } from "react";
import { Loader } from "@/components";

const NotFoundPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFoundJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Suspense fallback={<Loader />}>
      <NotFoundStyled>
        <Lottie options={defaultOptions} />
      </NotFoundStyled>
    </Suspense>
  );
};

export default NotFoundPage;

export const NotFoundStyled = styled.div`
  width: 65%;
  margin: auto;
  @media (max-width: 600px) {
    width: 90%;
  }
`;
