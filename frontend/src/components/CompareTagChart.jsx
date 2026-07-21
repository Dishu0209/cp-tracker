import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function CompareTagChart({ comparisonData }) {
  if (!comparisonData || comparisonData.length === 0) return null;

  const COLORS = ["#6366f1", "#06b6d4", "#22c55e", "#f59e0b", "#ec4899"];

  // Collect all tags
  const allTags = {};

  comparisonData.forEach((user) => {
    Object.entries(user.tagDistribution || {}).forEach(([tag, count]) => {
      allTags[tag] = (allTags[tag] || 0) + count;
    });
  });

  // Top 10 tags overall
  const topTags = Object.entries(allTags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);

  // Chart data
  const chartData = topTags.map((tag) => {
    const row = { tag };

    comparisonData.forEach((user) => {
      row[user.handle] = user.tagDistribution?.[tag] || 0;
    });

    return row;
  });

  // Top 3 strengths for each user
  const strengths = comparisonData.map((user) => {
    const top = Object.entries(user.tagDistribution || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return {
      handle: user.handle,
      top,
    };
  });

  // Most diverse solver
  const mostDiverse = comparisonData.reduce((best, current) => {
    const currentTopics = Object.keys(current.tagDistribution || {}).length;
    const bestTopics = Object.keys(best.tagDistribution || {}).length;

    return currentTopics > bestTopics ? current : best;
  });

  return (
    <div className="mt-10">
      {/* ================= HEADER ================= */}

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white">🧠 Topic Analysis</h2>

        <p className="mt-2 text-slate-400">
          Compare problem-solving strengths across the most popular Codeforces
          topics.
        </p>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-sm uppercase tracking-widest text-slate-400">
            Most Diverse Solver
          </div>

          <div className="mt-3 text-3xl font-black text-white break-all">
            🏆 {mostDiverse.handle}
          </div>

          <p className="mt-3 text-slate-400">
            Solved problems across{" "}
            <span className="font-semibold text-indigo-300">
              {Object.keys(mostDiverse.tagDistribution || {}).length}
            </span>{" "}
            different topics.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-sm uppercase tracking-widest text-slate-400">
            Total Topics Compared
          </div>

          <div className="mt-3 text-3xl font-black text-white">
            {topTags.length}
          </div>

          <p className="mt-3 text-slate-400">
            Showing the most attempted problem categories across all selected
            profiles.
          </p>
        </div>
      </div>

      {/* ================= CHART ================= */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
        <ResponsiveContainer width="100%" height={520}>
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 25,
              bottom: 10,
            }}
            barCategoryGap="28%"
          >
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8" }}
            />

            <YAxis
              type="category"
              dataKey="tag"
              width={140}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#cbd5e1",
                fontSize: 13,
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(99,102,241,0.08)",
              }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
              }}
            />
            {comparisonData.map((user, index) => (
              <Bar
                key={user.handle}
                dataKey={user.handle}
                fill={COLORS[index % COLORS.length]}
                radius={[8, 8, 8, 8]}
                barSize={18}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= TOP STRENGTHS ================= */}

      <div className="mt-8">
        <div className="mb-5">
          <h3 className="text-2xl font-bold text-white">🌟 Top Strengths</h3>

          <p className="mt-1 text-slate-400">
            Most solved topics for each selected profile.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {strengths.map((user, index) => (
            <div
              key={user.handle}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
            >
              {/* Header */}

              <div className="flex items-center justify-between">
                <div>
                  <a
                    href={`https://codeforces.com/profile/${user.handle}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xl font-bold text-white transition hover:text-indigo-400"
                  >
                    {user.handle}
                  </a>

                  <div className="mt-2 text-sm text-slate-400">
                    Top Problem Categories
                  </div>
                </div>

                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-bold text-white"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                >
                  {user.handle.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Top Tags */}

              <div className="mt-6 space-y-4">
                {user.top.map(([tag, count], idx) => (
                  <div key={tag}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                        </span>

                        <span className="font-medium text-white">{tag}</span>
                      </div>

                      <span className="font-bold text-indigo-300">{count}</span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-700">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.max(
                            (count / (user.top[0]?.[1] || 1)) * 100,
                            8,
                          )}%`,
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Topic Insight</h3>

            <p className="mt-2 max-w-3xl text-slate-400 leading-7">
              Strong performance across a wide variety of tags usually indicates
              broader competitive programming experience. The highlighted
              strengths show the areas where each participant has solved the
              highest number of problems.
            </p>
          </div>

          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/10 px-6 py-5 text-center">
            <div className="text-xs uppercase tracking-widest text-indigo-300">
              Most Diverse
            </div>

            <div className="mt-2 text-2xl font-black text-white break-all">
              🏆 {mostDiverse.handle}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareTagChart;
