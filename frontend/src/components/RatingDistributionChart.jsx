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

  return (
    <div className="group mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Rating Distribution
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Problems solved across different Codeforces rating levels.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: -10,
            bottom: 10,
          }}
        >
          <CartesianGrid
            stroke="#334155"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="rating"
            tick={{ fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "12px",
              color: "#fff",
            }}
            labelStyle={{
              color: "#cbd5e1",
            }}
          />

          <Bar
            dataKey="solved"
            fill="#6366f1"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RatingDistributionChart;