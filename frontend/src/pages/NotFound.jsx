import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background Glow */}
      <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"></div>

      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/90 p-10 text-center shadow-2xl backdrop-blur-xl">
        <h1 className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-8xl font-extrabold text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-white">
          Oops! Page Not Found
        </h2>

        <p className="mt-4 leading-7 text-slate-400">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/login"
          className="mt-8 inline-block rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default NotFound;