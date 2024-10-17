import { useDispatch, useSelector } from "react-redux";
import { addCountry, removeCountry } from "../store/my-countries-store";
import { Country } from "@/types/api";
import toast from "react-hot-toast";

const useMyCountries = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myCountries = useSelector((state: any) => state.myCountries.countries);

  const addToMyCountries = (country: Country[]) => {
    if (Math.random() < 0.5) {
      toast.error(
        "You failed to add countries to your list. Please try again later"
      );
      return;
    }

    dispatch(addCountry(country));
    toast.success("Country added to your list");
  };

  const removeFromMyCountries = (country: Country) => {
    dispatch(removeCountry(country));
  };

  return { myCountries, addToMyCountries, removeFromMyCountries };
};

export default useMyCountries;
