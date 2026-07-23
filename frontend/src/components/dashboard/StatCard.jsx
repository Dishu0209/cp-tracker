const iconMap = {
  "Total Submissions": "📨",
  "Accepted Submissions": "✅",
  "Solved Problems": "🎯",
  "Acceptance Rate": "📈",
  "Average Rating": "⭐",
  "Contests": "🏆",
};

function StatCard({ title, value }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.18)]">

      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            {title}
          </p>

          <span className="text-2xl">
            {iconMap[title] || "📊"}
          </span>

        </div>

        <h2 className="mt-5 text-5xl font-extrabold tracking-tight text-white">
          {value}
        </h2>

        <div className="mt-4 h-px w-full bg-gradient-to-r from-slate-700 via-slate-600 to-transparent"></div>

        <p className="mt-3 text-sm text-slate-500">
          Live analytics from your Codeforces submissions.
        </p>

      </div>

    </div>
  );
}

export default StatCard;