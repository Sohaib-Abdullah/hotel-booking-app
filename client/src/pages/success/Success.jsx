import React, { useEffect } from "react";
import "./success.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ConfettiExplosion from "react-confetti-explosion";
import { APIUrl } from "../../utils";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.put(`${APIUrl}/hotels`, {
          payment_intent,
        });
        console.log("response", response);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <>
      <div className="success">
        <p>
          Payment successful. You are being redirected to the orders page.
          Please do not close the page
        </p>
      </div>
      <ConfettiExplosion className="absolute m-auto" />
    </>
  );
};

export default Success;
