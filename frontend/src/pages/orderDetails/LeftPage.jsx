import { Rating, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const LeftPage = ({ data, amountStatus, orderCancelController }) => {
  const status = ["Pending", "Processing", "Shipped", "Delivered"];
  const activeStep = status.indexOf(data?.status);

  const steps = [
    {
      label: "Order Confirmed",
      description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: "Processing",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
      label: "Shipped",
      description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
    {
      label: "Delivered",
      description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between border-b p-4">
        <div className="space-y-2">
          <p className="font-semibold">{data?.productId?.name}</p>
          {/* <p className="text-sm">L,Brown</p> */}
          <p className="font-semibold">₹{data?.price}</p>
        </div>
        <img src={data?.productId?.images[0]?.url} className="h-24 w-20" />
      </div>
      {amountStatus === "created" ? (
        <div className="p-4 text-center text-red-500">
          This product is not created
        </div>
      ) : (
        <div className="p-6 border-b">
          <Stepper activeStep={activeStep + 1} orientation="vertical">
            {data?.status === "Cancelled" ? (
              <div className="text-red-700 font-semibold">
                You Have Cancel This Order
              </div>
            ) : (
              steps.map((step, index) => (
                <Step>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))
            )}
          </Stepper>
        </div>
      )}
      {amountStatus === "created" ? (
        ""
      ) : (
        <>
          <div className="p-4 border-b">
            <Rating size="large" name="read-only" value={4} readOnly />
          </div>
          <div className="flex items-center justify-between border-b">
            {data?.status === "Cancelled" || data?.status === "Delivered" ? (
              ""
            ) : (
              <button
                className="border-r w-full p-4"
                onClick={() => orderCancelController()}
                disabled={data?.status === "Cancelled"}
              >
                Cancel
              </button>
            )}

            <button className="w-full">Chat with us</button>
          </div>
        </>
      )}
    </div>
  );
};

export default LeftPage;
