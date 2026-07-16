import { useState } from "react";
import { Link } from "react-router-dom";
import { signupUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const handleSubmit=async (e) => {
     e.preventDefault();
        try {
          const data = await signupUser(name,username,email,password);
          console.log(data);
        navigate("/login");
        } catch (error) {
          console.log(error);
        }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mb-8 text-center text-sm text-slate-400">
          Join CP Tracker and start tracking your progress.
        </p>

        <form onSubmit={handleSubmit}>
           <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-indigo-500"
          />
          
           <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-indigo-500"
          />
          
           <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-indigo-500"
          />
          
           <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-indigo-500"
          />
          

         

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-500"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;