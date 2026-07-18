function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-white">
          CP Tracker
        </h1>

        <button className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-500">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;