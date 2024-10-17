import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useMyCountries from "../hooks/useMyCountries";
import { Country } from "@/types/api";

export const MyCountryList = () => {
  const { myCountries, removeFromMyCountries } = useMyCountries();

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
        {myCountries.length === 0 && (
          <TableRow>
            <TableCell colSpan={3}>No Countries Added</TableCell>
          </TableRow>
        )}
        {myCountries.map((country: Country) => (
          <TableRow key={country?.name?.common}>
            <TableCell>{country?.name?.common}</TableCell>
            <TableCell>
              <img
                src={country?.flags?.png}
                alt={country?.name?.common}
                className="w-10 h-6 object-cover rounded"
                loading="lazy"
                width={100}
              />
            </TableCell>
            <TableCell>
              <Button onClick={() => removeFromMyCountries(country)}>
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
