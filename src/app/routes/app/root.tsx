import { Outlet, useLocation } from "react-router-dom";
import { MainLayout } from "../../../components/layouts/main-layout";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const AppRoot = () => {
  const location = useLocation();
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            Loading...
          </div>
        }
      >
        <ErrorBoundary
          key={location.pathname}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div role="alert">
              <p>Something went wrong:</p>
              <pre>{error.message}</pre>
              <button onClick={resetErrorBoundary}>Try again</button>
            </div>
          )}
        >
          <Outlet />
        </ErrorBoundary>
      </Suspense>
    </MainLayout>
  );
};
