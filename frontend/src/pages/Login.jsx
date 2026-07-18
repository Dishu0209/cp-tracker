import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(identifier, password);

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      // Later we'll replace this with toast.error()
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background Glow */}
      <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"></div>

      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
        {/* Heading */}
        <h1 className="text-center text-4xl font-extrabold">
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            CP Tracker
          </span>
        </h1>

        <p className="mt-3 text-center text-slate-400">
          Welcome back! Continue your competitive programming journey.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <input
            type="text"
            placeholder="Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mb-4 w-full rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-400 transition hover:text-cyan-400"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;