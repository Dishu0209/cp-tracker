function TagDistribution({ distribution }) {
  const tags = Object.entries(distribution).sort((a, b) => b[1] - a[1]);

  const totalSolved = tags.reduce((sum, [, count]) => sum + count, 0);
  const highest = tags.length ? tags[0][1] : 0;

  if (tags.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-xl">
        <div className="py-16 text-center">
          <div className="text-6xl">🏷️</div>

          <h2 className="mt-4 text-2xl font-bold text-white">
            Tag Distribution
          </h2>

          <p className="mt-2 text-slate-400">
            Solve tagged problems to build your topic analytics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.18)]">
      {/* Glow */}
      <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl"></div>

      <div className="relative z-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Tag Distribution</h2>

            <p className="mt-2 text-sm text-slate-400">
              Problems solved across different Codeforces topics.
            </p>
          </div>

          <div className="flex gap-3">
            <span className="rounded-full bg-indigo-500/15 px-4 py-2 text-sm font-semibold text-indigo-300">
              {tags.length} Tags
            </span>
          </div>
        </div>

        <div className="max-h-[420px] space-y-4 overflow-y-auto pr-2">
          {tags.map(([tag, count], index) => {
            const width = (count / highest) * 100;

            return (
              <div
                key={tag}
                className="rounded-2xl border border-slate-800 bg-slate-800/40 p-4 transition-all duration-300 hover:border-indigo-500/40 hover:bg-slate-800/70"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-500">
                      #{index + 1}
                    </span>

                    <span className="font-semibold capitalize text-white">
                      {tag}
                    </span>
                  </div>

                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                    {count}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-700"
                    style={{
                      width: `${width}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TagDistribution;
