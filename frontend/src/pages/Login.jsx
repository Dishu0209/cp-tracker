import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
    const [identifier, setIdentifier] = useState("");
const [password, setPassword] = useState("");
const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
    const data=await loginUser(identifier,password);
    console.log(data);
    }
    catch(error)
    {
        console.log(error);
    }
};
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          CP Tracker
        </h1>

        <p className="mb-8 text-center text-sm text-slate-400">
          Track your competitive programming journey.
        </p>
       <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e)=>setIdentifier(e.target.value)}
          className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="mb-6 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-indigo-500"
        />

        <button className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-500"
        type="submit">
          Login
        </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
