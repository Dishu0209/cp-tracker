import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const navLinkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-indigo-400"
        : "text-slate-300 hover:text-white"
    }`;

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div>
            <h1 className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-3xl font-extrabold text-transparent">
              CP Tracker
            </h1>

            <p className="text-xs uppercase tracking-wider text-slate-500">
              Competitive Programming Dashboard
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>

            <NavLink to="/compare" className={navLinkClass}>
              Compare
            </NavLink>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2 font-semibold text-red-400 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-white">
              Logout
            </h2>

            <p className="mt-3 text-slate-400">
              Are you sure you want to logout from your account?
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="rounded-xl border border-slate-700 px-5 py-2 font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;