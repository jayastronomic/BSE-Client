import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentEndpoint from "../network/endpoints/PaymentEndpoint";
import CheckoutForm from "./CheckoutForm";
import Appointment from "../interfaces/Appointment";

const stripePromise = loadStripe(
  "pk_test_51NX1awD1w6de8HUKJ267UiimqIIvKahOC47DaGyilI546JWCGk0Cx8bhZbLQZH7Hm5R4NlgiWEgZ1G0IMk8y1kX000NyWdHPSb"
);
type CardPayoutProps = {
  appointment: Appointment;
};

const CardPayout = ({ appointment }: CardPayoutProps) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    PaymentEndpoint.createPaymentIntent(appointment).then((response) => {
      const { data } = response;
      setClientSecret(data.clientSecret);
    });
  }, [appointment]);

  const options = {
    clientSecret,
  };
  return (
    <div className="flex flex-col">
      <div className="text-sm font-semibold mb-4">Card Information</div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm appointment={appointment} />
        </Elements>
      )}
    </div>
  );
};

export default CardPayout;
