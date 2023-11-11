import HttpClient from "../../services/HttpClient";

export default class TestEndpoint {
  private static readonly http: HttpClient = new HttpClient(
    "http://localhost:4000"
  );

  public static test() {
    return TestEndpoint.http.get("/api/v1/test");
  }
}
