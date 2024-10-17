import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoot } from "./routes/app/root";

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <AppRoot />,
      children: [
        {
          path: "",
          lazy: async () => {
            const { CountriesRoute } = await import(
              "./routes/app/countries/countries"
            );
            return { Component: CountriesRoute };
          },
        },
        {
          path: "country/:id",

          lazy: async () => {
            const { CountryRoute } = await import(
              "./routes/app/countries/country"
            );
            return { Component: CountryRoute };
          },
        },
        {
          path: "my-countries",
          lazy: async () => {
            const { MyCountriesRoute } = await import(
              "./routes/app/my-countries/my-countries"
            );
            return { Component: MyCountriesRoute };
          },
        },
      ],
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFoundRoute } = await import("./routes/not-found");
        return { Component: NotFoundRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
};
