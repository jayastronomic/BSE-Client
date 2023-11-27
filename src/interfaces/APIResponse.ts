export default interface APIResponse<T> {
  data: T;
  status: "error" | "success";
  isError: boolean;
  errors: string[];
}
