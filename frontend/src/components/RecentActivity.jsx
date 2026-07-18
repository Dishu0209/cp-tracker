function RecentActivity({ submissions }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-4 text-xl font-bold text-white">
        Recent Activity
      </h2>

      {submissions.length === 0 ? (
        <p className="text-slate-400">No activity yet.</p>
      ) : (
        <div className="space-y-3">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="flex items-center justify-between rounded-lg bg-slate-800 p-4"
            >
              <div>
                <p className="font-semibold text-white">
                  {submission.name}
                </p>

                <p className="text-sm text-slate-400">
                  {submission.language}
                  {submission.rating
                    ? ` • ${submission.rating}`
                    : ""}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  submission.verdict === "OK"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {submission.verdict}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;