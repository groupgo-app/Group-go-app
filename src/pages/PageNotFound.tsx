import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex h-[calc(100vh-200px)] flex-grow items-center justify-center bg-gray-400">
      <div className="rounded-lg bg-gray-300 p-8 text-center shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-gray-600">
          Oops! The page you are looking for could not be found.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block rounded bg-orange-clr bg-opacity-20 px-4 py-2 font-semibold text-orange-clr hover:bg-opacity-30"
        >
          {" "}
          Go back to Home{" "}
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
