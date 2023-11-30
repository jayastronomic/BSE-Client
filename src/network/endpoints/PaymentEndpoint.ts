import APIResponse from "../../interfaces/APIResponse";
import AuthUser from "../../interfaces/AuthUser";
import PaymentIntent from "../../interfaces/PaymentIntent";
import HttpClient from "../../services/HttpClient";
export default class PaymentEndpoint {
  private static readonly http: HttpClient = new HttpClient(
    "http://localhost:4000"
  );

  public static createPaymentIntent(payload: any) {
    return PaymentEndpoint.http.post("/api/v1/create-payment-intent", payload, {
      "Content-Type": "application/json",
      Accept: "application/json",
    });
  }
}
