import { Method } from "../enums/Method";
import request from "../network/request";
type RequestOptions = {
  method?: Method;
  headers?: { [header: string]: string };
  body?: string;
};

export default class HttpClient {
  constructor(private host: string) {}

  async get<T>(path: string, headers?: { [header: string]: string }) {
    let options: RequestOptions = {};
    options.headers = headers;
    return await request<T>(this.host + path, options);
  }

  async post<T>(
    path: string,
    payload: T,
    headers?: { [header: string]: string }
  ) {
    let options: RequestOptions = {};
    options.method = Method.POST;
    options.body = JSON.stringify(payload);
    options.headers = headers;
    return await request<T>(this.host + path, options);
  }

  async put<T>(
    path: string,
    payload: T,
    headers?: { [header: string]: string }
  ) {
    let options: RequestOptions = {};
    options.method = Method.POST;
    options.body = JSON.stringify(payload);
    options.headers = headers;
    return await request<T>(this.host + path, options);
  }

  delete() {}
}
