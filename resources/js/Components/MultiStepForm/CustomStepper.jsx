import React from "react";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import {
  UserIcon,
  BuildingLibraryIcon,
  CogIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export function CustomStepper({
  activeStep,
  setActiveStep,
  setIsLastStep,
  setIsFirstStep,
}) {
  const totalSteps = 3;
  const progress = (activeStep / (totalSteps - 1)) * 100;

  return (
    <div className="w-full px-24 py-4 ">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step
          onClick={() => setActiveStep(0)}
          style={{ backgroundColor: "white" }}
        >
          <div className=" flex flex-col text-center">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "indigo" : "gray"}
            >
              Step 1
            </Typography>
            <Typography
              color={activeStep === 0 ? "indigo" : "gray"}
              className="font-normal"
            >
             Task Details
            </Typography>
          </div>
        </Step>
        <Step
          onClick={() => setActiveStep(1)}
          style={{ backgroundColor: "white" }}
        >
          <div className=" flex flex-col text-center">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "indigo" : "gray"}
            >
              Step 2
            </Typography>
            <Typography
              color={activeStep === 1 ? "indigo" : "gray"}
              className="font-normal"
            >
             Task Importance
            </Typography>
          </div>
        </Step>
        <Step
          onClick={() => setActiveStep(2)}
          style={{ backgroundColor: "white" }}
        >
          <div className=" flex flex-col text-center">
            <Typography
              variant="h6"
              color={activeStep === 2 ? "indigo" : "gray"}
            >
              Step 3
            </Typography>
            <Typography
              color={activeStep === 2 ? "indigo" : "gray"}
              className="font-normal"
            >
             Task Assignment
            </Typography>
          </div>
        </Step>
      </Stepper>
    </div>
  );
}
