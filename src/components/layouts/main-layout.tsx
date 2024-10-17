import { useEffect, useState } from "react";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";

const Progress = () => {
  const { state, location } = useNavigation();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [location?.pathname]);

  useEffect(() => {
    if (state === "loading") {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          const newProgress = oldProgress + 10;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 300);

      return () => {
        clearInterval(timer);
      };
    }
  }, [state]);

  if (state !== "loading") {
    return null;
  }

  return (
    <div
      className="fixed left-0 top-0 h-1 bg-blue-500 transition-all duration-200 ease-in-out"
      style={{ width: `${progress}%` }}
    ></div>
  );
};

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const navigation = [
    {
      name: "List Country",
      to: "/",
    },
    {
      name: "My Country List",
      to: "/my-countries",
    },
  ];
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-black sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "text-white font-bold bg-gray-800 px-10 py-2 rounded"
                  : "text-gray-200"
              }
              onClick={() => navigate(item.to)}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-white px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm: bg-transparent sm:px-6">
          <Progress />
          <Drawer>
            <DrawerTrigger>
              <Button size="icon" variant="outline" className="sm:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                  <span className="sr-only">Toggle Menu</span>
                </svg>
              </Button>
              <DrawerContent className="bg-black pt-4 text-white sm:max-w-60">
                <nav className="grid gap-6 text-lg font-medium pt-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "text-white font-bold bg-gray-800 px-10 py-2 rounded"
                          : "text-gray-400 group-hover:text-gray-300 px-10 py-2"
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </nav>
              </DrawerContent>
            </DrawerTrigger>
          </Drawer>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
};
