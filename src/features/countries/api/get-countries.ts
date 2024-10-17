import { api } from "@/lib/api-client";

export const getCountries = async () => {
  const response = api.get(`all?fields=name,capital,flags`);
  const data = await response.then((response) => response);
  return data;
};
