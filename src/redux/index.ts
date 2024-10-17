import { configureStore } from "@reduxjs/toolkit";
import myCountriesReducer from "../features/my-countries/store/my-countries-store";

const store = configureStore({
  reducer: {
    myCountries: myCountriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
