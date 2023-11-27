import Profile from "../../interfaces/Profile";
import HttpClient from "../../services/HttpClient";
export default class ProfileEndPoint {
  private static readonly http: HttpClient = new HttpClient(
    "http://localhost:4000"
  );

  public static create(payload: Profile) {
    return ProfileEndPoint.http.post("/api/v1/profiles", payload, {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer: ${localStorage.getItem("token")}`,
    });
  }
}
