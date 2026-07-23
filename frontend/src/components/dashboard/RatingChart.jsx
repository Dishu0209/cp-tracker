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

  if (data.length === 0) {
    return (
      <div className="mt-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-xl">
        <div className="py-16 text-center">
          <div className="text-6xl">📈</div>

          <h2 className="mt-4 text-2xl font-bold text-white">
            Rating History
          </h2>

          <p className="mt-2 text-slate-400">
            Participate in Codeforces contests to build your rating graph.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.18)]">

      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="relative z-10">

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Rating History
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Track your Codeforces rating progression across contests.
            </p>
          </div>

          <div className="flex gap-3">

            <span className="rounded-full bg-indigo-500/15 px-4 py-2 text-sm font-semibold text-indigo-300">
              {data.length} Contests
            </span>

            <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-300">
              Latest {data[data.length - 1].rating}
            </span>

          </div>

        </div>

        <ResponsiveContainer
          width="100%"
          height={380}
        >
          <LineChart
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
              dataKey="contest"
              hide
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
              cursor={{
                stroke: "#6366f1",
                strokeWidth: 1,
              }}
            />

            <Line
              type="monotone"
              dataKey="rating"
              stroke="#6366f1"
              strokeWidth={4}
              dot={false}
              activeDot={{
                r: 7,
                fill: "#22d3ee",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default RatingChart;