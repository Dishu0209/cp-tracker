import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function RatingChart({ ratingHistory }) {
  const data = ratingHistory.map((contest) => ({
    contest: contest.name,
    rating: contest.newRating,
  }));

  return (
    <div className="group mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)]">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Rating History
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Track your Codeforces rating progression.
          </p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <LineChart
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
            dataKey="contest"
            hide
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

          <Line
            type="monotone"
            dataKey="rating"
            stroke="#6366f1"
            strokeWidth={4}
            dot={false}
            activeDot={{
              r: 6,
              fill: "#22d3ee",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RatingChart;