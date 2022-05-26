/** @format */

import { backendApi } from "../api/api";
import ToastErrors from "../errors/ToastErrors";

export const PaymentGateWay = (
  orderData,
  userData,
  cb,
  toast,
  navigate,
  currency
) => {
  const options = {
    key: "rzp_test_gfk0PD54XehJDD", // Enter the Key ID generated from the Dashboard
    amount: orderData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: orderData.currency,
    name: "Test Store",
    description: "Test Transaction no real money will be deducted",
    image: "https://i.ibb.co/H78H4Q1/razorpay-1649771-1399875.webp",
    order_id: orderData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: async function (response) {
      try {
        const { data } = await backendApi.post("/order/verify", {
          orderData,
          response,
          userData,
        });
        if (data.orderVerified) {
          cb(true, data.userData);
        } else {
          cb(false, "Please try again");
        }
      } catch (error) {
        ToastErrors(error.response.status, toast, navigate);
      }
    },
    prefill: {
      name: userData?.firstname,
      email: userData?.email,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    modal: {
      ondismiss: function () {
        cb(false, "Portal closed by user");
      },
    },
    theme: {
      color: "#000000",
    },
  };
  const rapay = new window.Razorpay(options);
  rapay.on("payment.failed", (response) => {
    toast.error("Payment unsucessful please try again");
  });
  rapay.on("close", (e) => {
    console.log(e);
  });
  rapay.open();
};
