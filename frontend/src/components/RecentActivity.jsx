function RecentActivity({ submissions }) {
  return (
    <div className="group mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Your latest Codeforces submissions.
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 py-10 text-center">
          <p className="text-slate-400">
            No recent submissions found.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-800/60 p-4 transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-800"
            >
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-white">
                  {submission.name}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {submission.language}
                  {submission.rating
                    ? ` • ${submission.rating}`
                    : ""}
                </p>
              </div>

              <span
                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                  submission.verdict === "OK"
                    ? "border border-green-500/30 bg-green-500/10 text-green-400"
                    : "border border-red-500/30 bg-red-500/10 text-red-400"
                }`}
              >
                {submission.verdict === "OK"
                  ? "Accepted"
                  : submission.verdict}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;