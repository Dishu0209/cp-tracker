import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function RatingDistributionChart({ distribution }) {
  const data = Object.entries(distribution).map(([rating, count]) => ({
    rating,
    solved: count,
  }));

  const totalSolved = data.reduce(
    (sum, item) => sum + item.solved,
    0
  );

  if (data.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-xl">
        <div className="py-16 text-center">
          <div className="text-6xl">📊</div>

          <h2 className="mt-4 text-2xl font-bold text-white">
            Rating Distribution
          </h2>

          <p className="mt-2 text-slate-400">
            Solve rated problems to build your rating distribution.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.18)]">

      {/* Glow */}
      <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="relative z-10">

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Rating Distribution
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Problems solved across Codeforces rating levels.
            </p>
          </div>

          <div className="flex gap-3">

            <span className="rounded-full bg-indigo-500/15 px-4 py-2 text-sm font-semibold text-indigo-300">
              {data.length} Buckets
            </span>

            <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300">
              {totalSolved} Solved
            </span>

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={380}
        >
          <BarChart
            data={data}
            margin={{
              top: 15,
              right: 20,
              left: -15,
              bottom: 10,
            }}
          >
            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
              opacity={0.35}
            />

            <XAxis
              dataKey="rating"
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#94a3b8",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{
                fill: "rgba(99,102,241,0.08)",
              }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #475569",
                borderRadius: "16px",
                color: "#fff",
              }}
              labelStyle={{
                color: "#cbd5e1",
                fontWeight: "bold",
              }}
            />

            <Bar
              dataKey="solved"
              fill="#6366f1"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default RatingDistributionChart;