import { MyCountryList } from "@/features/my-countries/components/my-country-list";
import { ContentLayout } from "../../../../components/layouts/content-layouts";

export const MyCountriesRoute = () => {
  return (
    <ContentLayout title="My Countries">
      <MyCountryList />
    </ContentLayout>
  );
};
