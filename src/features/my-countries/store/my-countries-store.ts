import { Country } from "@/types/api";
import { createSlice } from "@reduxjs/toolkit";

interface MyCountriesState {
  countries: Country[];
}

const initialState: MyCountriesState = {
  countries: [],
};

const myCountriesSlice = createSlice({
  name: "myCountries",
  initialState,
  reducers: {
    addCountry: (state, action) => {
      state.countries.push(action.payload);
    },
    removeCountry: (state, action) => {
      state.countries = state.countries.filter(
        (country) => country.name.common !== action.payload.name.common
      );
    },
  },
});

export const { addCountry, removeCountry } = myCountriesSlice.actions;
export default myCountriesSlice.reducer;
