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

function ComparePerformanceChart({ comparisonData }) {
  if (!comparisonData || comparisonData.length === 0) return null;

  const metrics = [
    {
      key: "rating",
      label: "Current Rating",
    },
    {
      key: "maxRating",
      label: "Max Rating",
    },
    {
      key: "uniqueSolvedProblems",
      label: "Solved Problems",
    },
    {
      key: "acceptedSubmissions",
      label: "Accepted",
    },
    {
      key: "accuracy",
      label: "Accuracy (%)",
    },
  ];

  const chartData = metrics.map((metric) => {
    const row = {
      metric: metric.label,
    };

    comparisonData.forEach((user) => {
      if (metric.key === "accuracy") {
        row[user.handle] =
          user.totalSubmission === 0
            ? 0
            : Number(
                (
                  (user.acceptedSubmissions / user.totalSubmission) *
                  100
                ).toFixed(1)
              );
      } else {
        row[user.handle] = user[metric.key];
      }
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
          Performance Comparison
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Compare key Codeforces performance metrics across selected handles.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={chartData}
          layout="vertical"
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
            dataKey="metric"
            tick={{ fill: "#cbd5e1", fontSize: 14 }}
            width={150}
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
              color: "#fff",
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

export default ComparePerformanceChart;