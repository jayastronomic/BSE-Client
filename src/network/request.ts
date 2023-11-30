import APIResponse from "../interfaces/APIResponse";

export default async function request<T>(
  path: string,
  options: object = {}
): Promise<APIResponse<unknown | T>> {
  const response = await fetch(path, options);
  return await response.json();
}
