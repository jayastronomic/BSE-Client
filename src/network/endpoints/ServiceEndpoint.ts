import Service from "../../interfaces/Service";
import HttpClient from "../../services/HttpClient";

export default class ServiceEndpoint {
  private static http: HttpClient = new HttpClient("http://localhost:4000");

  public static index() {
    return ServiceEndpoint.http.get<Service[]>("/api/v1/services");
  }

  public static show(id: string) {
    return ServiceEndpoint.http.get(`/api/v1/services/${id}`);
  }
}
