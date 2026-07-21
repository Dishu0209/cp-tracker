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

function CompareTagChart({ comparisonData }) {
  if (!comparisonData || comparisonData.length === 0) return null;

  // Collect every tag from all users
  const allTags = {};

  comparisonData.forEach((user) => {
    Object.entries(user.tagDistribution).forEach(([tag, count]) => {
      if (!allTags[tag]) {
        allTags[tag] = 0;
      }
      allTags[tag] += count;
    });
  });

  // Top 10 most common tags
  const topTags = Object.entries(allTags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);

  const chartData = topTags.map((tag) => {
    const row = {
      tag,
    };

    comparisonData.forEach((user) => {
      row[user.handle] = user.tagDistribution[tag] || 0;
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
          Tag Comparison
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Compare problem-solving strengths across the most common Codeforces tags.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={750}>
        <BarChart
          layout="vertical"
          data={chartData}
          barCategoryGap="35%"
          margin={{
            top: 10,
            right: 35,
            left: 35,
            bottom: 10,
          }}
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
            dataKey="tag"
            width={140}
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

export default CompareTagChart;