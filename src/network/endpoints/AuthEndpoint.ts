import AuthUser from "../../interfaces/AuthUser";
import HttpClient from "../../services/HttpClient";
export default class AuthEndPoint {
  private static readonly http: HttpClient = new HttpClient(
    "http://localhost:4000"
  );

  public static create(payload: AuthUser) {
    return AuthEndPoint.http.post("/api/v1/auth/signup", payload, {
      "Content-Type": "application/json",
      Accept: "application/json",
    });
  }

  public static login(payload: AuthUser) {
    return AuthEndPoint.http.post("/api/v1/auth/login", payload, {
      "Content-Type": "application/json",
      Accept: "application/json",
    });
  }

  public static loggedIn() {
    return AuthEndPoint.http.get<AuthUser>("/api/v1/auth/loggedIn", {
      Authorization: `Bearer: ${localStorage.getItem("token")}`,
    });
  }

  public static logout() {
    return AuthEndPoint.http.delete<null>("/api/v1/auth/logout", {
      Authorization: `Bearer: ${localStorage.getItem("token")}`,
    });
  }
  public static emailAlreadyExists(email: { email: string }) {
    return AuthEndPoint.http.post("/api/v1/auth/emailTaken", email, {
      "Content-Type": "application/json",
      Accept: "application/json",
    });
  }
}
