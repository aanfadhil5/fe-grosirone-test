import { api } from "@/lib/api-client";

export const getCountry = async (name: string) => {
  const response = api.get(`name/${name}`);
  const data = await response.then((response) => response.data);
  return data[0];
};
