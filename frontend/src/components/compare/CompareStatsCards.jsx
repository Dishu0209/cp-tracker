function CompareStatsCards({ comparisonData }) {
  if (!comparisonData || comparisonData.length === 0) return null;

  const getAccuracy = (user) =>
    user.totalSubmission
      ? (
          (user.acceptedSubmissions / user.totalSubmission) *
          100
        ).toFixed(1)
      : "0.0";

  const metrics = [
    {
      label: "Current Rating",
      icon: "⭐",
      key: "rating",
      suffix: "",
      higherBetter: true,
    },
    {
      label: "Max Rating",
      icon: "🏆",
      key: "maxRating",
      suffix: "",
      higherBetter: true,
    },
    {
      label: "Solved Problems",
      icon: "🧩",
      key: "uniqueSolvedProblems",
      suffix: "",
      higherBetter: true,
    },
    {
      label: "Accepted",
      icon: "✅",
      key: "acceptedSubmissions",
      suffix: "",
      higherBetter: true,
    },
    {
      label: "Total Submissions",
      icon: "📤",
      key: "totalSubmission",
      suffix: "",
      higherBetter: true,
    },
    {
      label: "Accuracy",
      icon: "🎯",
      key: "accuracy",
      suffix: "%",
      higherBetter: true,
    },
  ];

  const getValue = (user, key) => {
    if (key === "accuracy") return Number(getAccuracy(user));
    return user[key] ?? 0;
  };

  return (
    <div className="mt-10">
      {/* Heading */}

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">
          📊 Quick Comparison
        </h2>

        <p className="mt-2 text-slate-400">
          Compare the most important competitive programming metrics side by
          side.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Header */}

        <div
          className="grid border-b border-slate-800 bg-slate-950/80"
          style={{
            gridTemplateColumns: `220px repeat(${comparisonData.length}, minmax(0,1fr))`,
          }}
        >
          <div className="border-r border-slate-800 px-6 py-5 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Metric
          </div>

          {comparisonData.map((user) => (
            <a
              key={user.handle}
              href={`https://codeforces.com/profile/${user.handle}`}
              target="_blank"
              rel="noreferrer"
              className="border-r border-slate-800 px-6 py-5 transition hover:bg-slate-800/50 last:border-r-0"
            >
              <div className="text-lg font-bold text-white break-all">
                {user.handle}
              </div>

              <div className="mt-2 inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium capitalize text-indigo-300">
                {user.rank}
              </div>
            </a>
          ))}
        </div>

        {/* Metric Rows */}

        {metrics.map((metric, index) => {
          const maxValue = Math.max(
            ...comparisonData.map((u) => getValue(u, metric.key))
          );

          return (
            <div
              key={metric.key}
              className={`grid ${
                index !== metrics.length - 1
                  ? "border-b border-slate-800"
                  : ""
              }`}
              style={{
                gridTemplateColumns: `220px repeat(${comparisonData.length}, minmax(0,1fr))`,
              }}
            >
              {/* Metric Name */}

              <div className="border-r border-slate-800 px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{metric.icon}</span>

                  <div>
                    <div className="font-semibold text-white">
                      {metric.label}
                    </div>

                    <div className="text-sm text-slate-500">
                      Higher is better
                    </div>
                  </div>
                </div>
              </div>
                            {/* Values */}

              {comparisonData.map((user) => {
                const value = getValue(user, metric.key);
                const isWinner = value === maxValue;

                return (
                  <div
                    key={`${metric.key}-${user.handle}`}
                    className={`relative border-r border-slate-800 px-6 py-5 last:border-r-0 transition-all duration-300 ${
                      isWinner
                        ? "bg-emerald-500/10"
                        : "hover:bg-slate-800/40"
                    }`}
                  >
                    {isWinner && (
                      <div className="absolute right-4 top-4 rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        🏆 Best
                      </div>
                    )}

                    <div className="text-3xl font-black text-white">
                      {value}
                      {metric.suffix}
                    </div>

                    {metric.key === "accuracy" && (
                      <>
                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              isWinner
                                ? "bg-emerald-400"
                                : "bg-indigo-400"
                            }`}
                            style={{
                              width: `${Math.min(Number(value), 100)}%`,
                            }}
                          />
                        </div>

                        <div className="mt-2 text-xs text-slate-400">
                          Submission Success Rate
                        </div>
                      </>
                    )}

                    {metric.key !== "accuracy" && (
                      <div className="mt-3 text-sm text-slate-400">
                        {isWinner
                          ? "Highest among selected handles"
                          : `${maxValue - value} behind leader`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">
              Quick Insight
            </h3>

            <p className="mt-2 text-slate-400">
              Each row highlights the best performer for that metric. This
              gives an at-a-glance comparison before diving into detailed
              charts and analytics.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-center">
            <div className="text-xs uppercase tracking-widest text-emerald-300">
              Winner Highlight
            </div>

            <div className="mt-2 text-lg font-bold text-white">
              🏆 Best value in every row
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareStatsCards;