function WelcomeBanner({ user }) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-8 shadow-xl">
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-3xl"></div>
      <div className="absolute -bottom-16 left-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="relative z-10">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-indigo-400">
          {greeting}
        </p>

        <h1 className="mt-3 text-4xl font-extrabold text-white">
          Welcome back,
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            {user?.name || "User"}
          </span>
          👋
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
          Keep solving problems, improve your rating, and track your
          competitive programming journey with detailed analytics.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <div className="rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 backdrop-blur">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Platform
            </p>
            <p className="mt-1 font-semibold text-white">
              Codeforces
            </p>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 backdrop-blur">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Goal
            </p>
            <p className="mt-1 font-semibold text-white">
              Reach Expert 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;