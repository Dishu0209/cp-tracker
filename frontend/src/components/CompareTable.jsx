function CompareTable({ comparisonData }) {
  if (!comparisonData || comparisonData.length === 0) return null;

  const users = comparisonData.map((user) => ({
    ...user,
    accuracy:
      user.totalSubmission === 0
        ? 0
        : Number(
            (
              (user.acceptedSubmissions / user.totalSubmission) *
              100
            ).toFixed(1)
          ),
  }));

  const rows = [
    {
      label: "Current Rating",
      key: "rating",
      suffix: "",
    },
    {
      label: "Max Rating",
      key: "maxRating",
      suffix: "",
    },
    {
      label: "Solved Problems",
      key: "uniqueSolvedProblems",
      suffix: "",
    },
    {
      label: "Accepted",
      key: "acceptedSubmissions",
      suffix: "",
    },
    {
      label: "Total Submissions",
      key: "totalSubmission",
      suffix: "",
    },
    {
      label: "Accuracy",
      key: "accuracy",
      suffix: "%",
    },
  ];

  return (
    <div className="group mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)]">
      <div className="border-b border-slate-800 px-6 py-5">
        <h2 className="text-2xl font-bold text-white">
          Detailed Comparison
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Side-by-side comparison of important Codeforces statistics.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="border-b border-slate-800 bg-slate-950">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Metric
              </th>

              {users.map((user) => (
                <th
                  key={user.handle}
                  className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300"
                >
                  {user.handle}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => {
              const maxValue = Math.max(
                ...users.map((user) => user[row.key])
              );

              return (
                <tr
                  key={row.key}
                  className={`border-b border-slate-800 transition-colors hover:bg-slate-800/40 ${
                    index % 2 === 0
                      ? "bg-slate-900"
                      : "bg-slate-950/40"
                  }`}
                >
                  <td className="px-6 py-5 font-medium text-white">
                    {row.label}
                  </td>

                  {users.map((user) => {
                    const winner = user[row.key] === maxValue;

                    return (
                      <td
                        key={user.handle + row.key}
                        className="px-6 py-5 text-center"
                      >
                        <div
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition-all ${
                            winner
                              ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {winner && "🥇"}

                          {user[row.key]}
                          {row.suffix}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompareTable;