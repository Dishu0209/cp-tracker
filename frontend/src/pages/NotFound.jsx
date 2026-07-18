import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-indigo-500">404</h1>

        <h2 className="mt-4 text-3xl font-semibold text-white">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-400">
          The page you are looking for doesn't exist.
        </p>

        <Link
          to="/login"
          className="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500 transition"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default NotFound;