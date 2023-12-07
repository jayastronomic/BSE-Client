import APIResponse from "../interfaces/APIResponse";

export default async function request<T>(
  path: string,
  options: object = {}
): Promise<APIResponse<T>> {
  try {
    const response = await fetch(path, options);
    return await response.json();
  } catch (exception: any) {
    throw exception;
  }
}
