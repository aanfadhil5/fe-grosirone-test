import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { getCountries } from "../api/get-countries";

interface Country {
  name: { common: string };
  capital: string;
  flags: { png: string };
}

export const CountriesList = () => {
  const [countries, setCountries] = React.useState<Country[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountries();
        setCountries(data.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!countries?.length) {
    return <div>No countries available</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="w-[30%]">Flag</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {countries.map((country: Country) => (
          <TableRow key={country.name.common}>
            <TableCell>{country.name.common}</TableCell>
            <TableCell>
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="w-10 h-6 object-cover rounded"
                loading="lazy"
                width={100}
              />
            </TableCell>
            <TableCell>
              <Button variant="link" asChild>
                <Link to={`/country/${country.name.common}`}>Details</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
