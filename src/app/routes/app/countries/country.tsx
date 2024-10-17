import { useParams } from "react-router-dom";
import { ContentLayout } from "../../../../components/layouts/content-layouts";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useMyCountries from "@/features/my-countries/hooks/useMyCountries";
import { Country } from "@/types/api";
import { getCountry } from "@/features/countries/api/get-country";

export const CountryRoute = () => {
  const { myCountries, addToMyCountries } = useMyCountries();
  const { id } = useParams();

  const [country, setCountry] = React.useState<Country | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const data = await getCountry(id);
        setCountry(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ContentLayout title="Country">
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 dark:bg-gray-800">
        {/* Flag */}
        <div className="flex items-center space-x-4 justify-between">
          <img
            className="w-20 h-14 object-cover rounded-lg shadow"
            src={country?.flags.png}
            alt="Flag"
          />

          <span className="text-3xl">{country?.flag}</span>
        </div>

        {/* Capital and Population */}
        <div className="text-gray-900 dark:text-gray-300">
          <h2 className="text-lg font-semibold">
            Capital: {country?.capital[0]}
          </h2>
          <p>Population: {country?.population}</p>
          <p>Independent: {country?.independent ? "Yes" : "No"}</p>
        </div>

        {/* Currencies */}
        <div className="text-gray-700 dark:text-gray-400">
          <h3 className="text-md font-semibold">Currency:</h3>
          <p>
            {country?.currencies && (
              <>
                {Object.values(country.currencies)[0]?.name} (
                {Object.values(country.currencies)[0]?.symbol})
              </>
            )}
          </p>
        </div>

        {/* Languages */}
        <div className="text-gray-700 dark:text-gray-400">
          <h3 className="text-md font-semibold">Languages:</h3>
          {country?.languages && (
            <p>{Object.values(country?.languages).join(", ")}</p>
          )}
        </div>

        {/* Maps */}
        <div className="text-gray-700 dark:text-gray-400">
          <h3 className="text-md font-semibold">Maps:</h3>
          <a
            href={country?.maps.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google Maps
          </a>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={myCountries.find(
                (c: Country) => c.name.common === country?.name?.common
              )}
            >
              {myCountries.find(
                (c: Country) => c.name.common === country?.name?.common
              )
                ? "Delegated"
                : "Delegate"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to delegate the country to your organization. This
                action have 50% chance to fail.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  addToMyCountries(country!);
                }}
              >
                Delegate
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ContentLayout>
  );
};
