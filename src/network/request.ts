import APIResponse from "../interfaces/APIResponse";

export default async function request(
  path: string,
  options: object = {}
): Promise<APIResponse<unknown>> {
  const response = await fetch(path, options);
  return await response.json();
}
