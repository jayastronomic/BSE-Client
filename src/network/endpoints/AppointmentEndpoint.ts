import HttpClient from "../../services/HttpClient";
import Appointment from "../../interfaces/Appointment";
export default class AppointmentEndpoint {
  private static readonly http: HttpClient = new HttpClient(
    "http://localhost:4000"
  );

  public static create(payload: Appointment) {
    return AppointmentEndpoint.http.post("/api/v1/appointments", payload, {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer: ${localStorage.getItem("token")}`,
    });
  }

  public static authUserAppointments() {
    return AppointmentEndpoint.http.get<Appointment[]>(
      "/api/v1/user/appointments",
      {
        Accept: "application/json",
        Authorization: `Bearer: ${localStorage.getItem("token")}`,
      }
    );
  }
}
