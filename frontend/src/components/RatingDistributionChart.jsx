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
    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Rating Distribution
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid stroke="#334155" />

          <XAxis dataKey="rating" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="solved" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RatingDistributionChart;