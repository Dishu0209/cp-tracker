import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function CompareRatingDistributionChart({ comparisonData }) {
  if (!comparisonData || comparisonData.length === 0) return null;

  // Collect all rating buckets
  const ratingBuckets = new Set();

  comparisonData.forEach((user) => {
    Object.keys(user.ratingDistribution).forEach((rating) =>
      ratingBuckets.add(rating)
    );
  });

  // Sort buckets numerically
  const sortedBuckets = [...ratingBuckets].sort(
    (a, b) => Number(a) - Number(b)
  );

  // Build chart data
  const chartData = sortedBuckets.map((bucket) => {
    const row = {
      rating: bucket,
    };

    comparisonData.forEach((user) => {
      row[user.handle] = user.ratingDistribution[bucket] || 0;
    });

    return row;
  });

  const COLORS = [
    "#6366f1",
    "#06b6d4",
    "#f59e0b",
  ];

  return (
    <div className="group mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Rating Distribution Comparison
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Compare solved problems across Codeforces rating ranges.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={850}>
        <BarChart
          layout="vertical"
          data={chartData}
         
          margin={{
            top: 10,
            right: 35,
            left: 35,
            bottom: 10,
          }}
          barCategoryGap="35%"
          barGap={4}
        >
          <CartesianGrid
            stroke="#334155"
            strokeDasharray="4 4"
          />

          <XAxis
            type="number"
            tick={{ fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            type="category"
            dataKey="rating"
            width={80}
            tick={{
              fill: "#cbd5e1",
              fontSize: 13,
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
              border: "1px solid #334155",
              borderRadius: "12px",
            }}
            labelStyle={{
              color: "#cbd5e1",
              fontWeight: 600,
            }}
          />

          <Legend
            wrapperStyle={{
              color: "#e2e8f0",
              paddingTop: 20,
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
  );
}

export default CompareRatingDistributionChart;