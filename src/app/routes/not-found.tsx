import { Link } from "../../components/ui/link";

export const NotFoundRoute = () => {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for doesn't exist</p>
      <Link to="/" replace>
        Back to Home
      </Link>
    </div>
  );
};
