import { CountriesList } from "@/features/countries/components/countries-list";
import { ContentLayout } from "../../../../components/layouts/content-layouts";

export const CountriesRoute = () => {
  return (
    <ContentLayout title="List Country">
      <CountriesList />
    </ContentLayout>
  );
};
