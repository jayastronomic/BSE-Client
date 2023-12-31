import APIResponse from "../../interfaces/APIResponse";
import Appointment from "../../interfaces/Appointment";
import AuthUser from "../../interfaces/AuthUser";
import PaymentIntent from "../../interfaces/PaymentIntent";
import HttpClient from "../../services/HttpClient";
export default class PaymentEndpoint {
  private static readonly http: HttpClient = new HttpClient(
    "http://localhost:4000"
  );

  public static createPaymentIntent(payload: any) {
    return PaymentEndpoint.http.post<PaymentIntent>(
      "/api/v1/create-payment-intent",
      payload,
      {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );
  }
}
