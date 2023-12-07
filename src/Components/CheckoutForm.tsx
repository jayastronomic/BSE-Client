import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { ThreeDots } from "react-loader-spinner";
import Appointment from "../interfaces/Appointment";
import AppointmentEndpoint from "../network/endpoints/AppointmentEndpoint";
import { useNavigate } from "react-router-dom";

type CheckoutFormProps = {
  appointment: Appointment;
};

const CheckoutForm = ({ appointment }: CheckoutFormProps) => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);
  const { email } = authUser!;
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        receipt_email: email,
      },
      redirect: "if_required",
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (!error) {
      AppointmentEndpoint.create(appointment).then((response) => {
        const { data, status } = response;
        if (status === "success") {
          navigate("/");
        }
      });
    } else if (
      error.type === "card_error" ||
      error.type === "validation_error"
    ) {
      setMessage(error.message!);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "accordion",
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PaymentElement options={paymentElementOptions} />
        <button
          className="flex justify-center bg-black w-full rounded text-white text-sm py-8 mt-4 hover:bg-opacity-90 transition"
          disabled={isLoading || !stripe || !elements}
        >
          <span>
            {isLoading ? (
              <ThreeDots height={20} width={60} color="white" />
            ) : (
              "BOOK APPOINTMENT"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && (
          <div className="flex justify-center text-red-600 text-sm mt-2">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
