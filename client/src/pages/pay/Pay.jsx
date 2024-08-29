import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import { APIUrl } from "../../utils";
import CheckoutForm from "../../components/checkoutform/CheckoutForm";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51MIoQxADtfdeX0EyLc3dczOhEtrQ3P3cIS7vJwN83zYLcgC1qXCytGQGHEfvSRjEBWIdNXsov5U2pRaPJOr7CfBd004c3oaSGC"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          `${APIUrl}/hotels/payment/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log("payment-error", err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  console.log("client-secret", clientSecret);
  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
