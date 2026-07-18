function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-sm font-medium text-slate-400">
        {title}
      </h3>

      <p className="mt-3 text-4xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

export default StatCard;