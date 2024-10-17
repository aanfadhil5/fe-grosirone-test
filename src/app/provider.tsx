import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "@/redux";
import ToastComponent from "@/components/ui/toast/toast";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <ErrorBoundary fallbackRender={() => <div>Something went wrong</div>}>
        <Provider store={store}>
          <HelmetProvider>
            <ToastComponent />
            {children}
          </HelmetProvider>
        </Provider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
