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
    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Rating History
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" />

          <XAxis
            dataKey="contest"
            hide
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="rating"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RatingChart;