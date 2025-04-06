import React from "react";
import { Skeleton, Step, Stepper as MUIStepper } from "@mui/material";
import { useTranslation } from "react-i18next";
import BasketIcon from "../../assets/icons/BasketIcon";
import CarIcon from "../../assets/icons/CarIcon";
import CheckIcon from "../../assets/icons/CheckIcon";
import DeliveryManIcon from "../../assets/icons/DeliveryManIcon";
import { PageTitle } from "../../../orders/container/Orders.style";
import { StepperStyled } from "./Stepper.style";
import { TOrderStatus } from "@/types/common";

export const STEPS = [
  {
    icon: <BasketIcon />,
    title: "PROFILE.PENDING",
    status: "pending",
  },
  {
    icon: <CheckIcon />,
    title: "PROFILE.ACCEPTED",
    status: "accepted",
  },
  {
    icon: <CarIcon />,
    title: "PROFILE.ONTHEWAY",
    status: "onTheWay",
  },
  {
    icon: <DeliveryManIcon />,
    title: "PROFILE.DELIVERED",
    status: "delivered",
  },
];

const Stepper: React.FC<{ status: TOrderStatus; isLoading: boolean }> = ({
  status,
  isLoading,
}) => {
  const { t } = useTranslation();

  const activeStep = React.useMemo(() => {
    return STEPS.findIndex((step) => step.status === status);
  }, [status]);

  const skeleton = React.useMemo(() => {
    return (
      <MUIStepper nonLinear activeStep={activeStep} className="mui-stepper">
        {STEPS.map((step, index) => (
          <Step
            key={step.title}
            className={`${activeStep === index ? "active" : ""}`}
          >
            <Skeleton
              variant="circular"
              className="step-icon"
              width="60px"
              height="60px"
            />
            <Skeleton variant="text" className="step-title text-center mb-1" />
            <Skeleton variant="text" className="step-time mb-1 text-center" />
            <Skeleton variant="text" className="step-date text-center" />
          </Step>
        ))}
      </MUIStepper>
    );
  }, []);

  return (
    <StepperStyled className="mb-4">
      {isLoading ? (
        <Skeleton width="200px" variant="text" className="mb-3 page-title" />
      ) : (
        <PageTitle className="mb-3">{t("PROFILE.ORDER")} № 2</PageTitle>
      )}
      {isLoading ? (
        skeleton
      ) : (
        <MUIStepper nonLinear activeStep={activeStep} className="mui-stepper">
          {STEPS.map((step, index) => (
            <Step
              key={step.status}
              className={`${activeStep === index ? "active" : ""}`}
            >
              <div>
                <div className="step-icon d-flex justify-content-center ">
                  {step.icon}
                </div>
                <p className="step-title text-center mb-1">{t(step.title)}</p>
                {/* <time className='step-time mb-1 text-center'>11:00</time>
                                <div className='step-date text-center'>09.01.2022</div> */}
              </div>
            </Step>
          ))}
        </MUIStepper>
      )}
    </StepperStyled>
  );
};

export default Stepper;
