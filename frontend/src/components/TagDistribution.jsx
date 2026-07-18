function TagDistribution({ distribution }) {
  const tags = Object.entries(distribution).sort((a, b) => b[1] - a[1]);

  return (
    <div className="group mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Tag Distribution
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Problems solved by topic.
        </p>
      </div>

      {tags.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 py-10 text-center">
          <p className="text-slate-400">
            No tags available.
          </p>
        </div>
      ) : (
        <div className="max-h-96 space-y-3 overflow-y-auto pr-2">
          {tags.map(([tag, count]) => (
            <div
              key={tag}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-800/60 px-4 py-3 transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-800"
            >
              <span className="font-medium text-white capitalize">
                {tag}
              </span>

              <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400">
                {count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagDistribution;