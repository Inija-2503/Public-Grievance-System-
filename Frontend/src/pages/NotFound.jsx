import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl font-extrabold tracking-widest text-gray-900">
        404
      </h1>
      <div className="absolute rotate-12 rounded bg-indigo-600 px-2 text-sm text-white">
        Page Not Found
      </div>
      <p className="mt-4 text-center text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
      >
        Go Back Home
      </Link>
    </main>
  );
};

export default NotFound;
