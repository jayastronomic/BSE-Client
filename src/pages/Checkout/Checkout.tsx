import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentEndpoint from "../../network/endpoints/PaymentEndpoint";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NX1awD1w6de8HUKJ267UiimqIIvKahOC47DaGyilI546JWCGk0Cx8bhZbLQZH7Hm5R4NlgiWEgZ1G0IMk8y1kX000NyWdHPSb"
);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    PaymentEndpoint.createPaymentIntent({
      items: [{ id: "xl-tshirt" }],
    }).then((response: any) => setClientSecret(response.clientSecret));
  }, []);

  const options = {
    clientSecret,
  };
  return (
    <div className="flex flex-col">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
