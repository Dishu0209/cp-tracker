function StatCard({ title, value }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">
      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl"></div>

      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          {title}
        </p>

        <h2 className="mt-4 text-5xl font-extrabold tracking-tight text-white">
          {value}
        </h2>
      </div>
    </div>
  );
}

export default StatCard;