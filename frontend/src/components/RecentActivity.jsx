function RecentActivity({ submissions }) {
  const verdictStyle = (verdict) => {
    switch (verdict) {
      case "OK":
        return "border-green-500/30 bg-green-500/10 text-green-400";

      case "WRONG_ANSWER":
        return "border-red-500/30 bg-red-500/10 text-red-400";

      case "TIME_LIMIT_EXCEEDED":
        return "border-orange-500/30 bg-orange-500/10 text-orange-400";

      case "COMPILATION_ERROR":
        return "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";

      case "RUNTIME_ERROR":
        return "border-pink-500/30 bg-pink-500/10 text-pink-400";

      default:
        return "border-slate-600 bg-slate-700/30 text-slate-300";
    }
  };

  const verdictText = (verdict) => {
    switch (verdict) {
      case "OK":
        return "Accepted";

      case "WRONG_ANSWER":
        return "Wrong Answer";

      case "TIME_LIMIT_EXCEEDED":
        return "Time Limit";

      case "COMPILATION_ERROR":
        return "Compilation Error";

      case "RUNTIME_ERROR":
        return "Runtime Error";

      default:
        return verdict.replaceAll("_", " ");
    }
  };

  return (
    <div className="group mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)]">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your latest Codeforces submissions.
          </p>

        </div>

        <span className="rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300">
          {submissions.length} Recent
        </span>

      </div>

      {submissions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 py-12 text-center">

          <div className="text-5xl">📭</div>

          <p className="mt-4 text-lg font-semibold text-white">
            No Recent Activity
          </p>

          <p className="mt-2 text-slate-400">
            Solve some problems on Codeforces to see them here.
          </p>

        </div>
      ) : (
        <div className="space-y-5">

          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="group/item rounded-2xl border border-slate-800 bg-slate-800/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:bg-slate-800/70"
            >

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-start gap-4">

                  <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500/15 text-xl">
                    💻
                  </div>

                  <div>

                    <h3 className="text-lg font-semibold text-white transition group-hover/item:text-indigo-300">
                      {submission.name}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-2">

                      <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                        {submission.language}
                      </span>

                      {submission.rating && (
                        <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-300">
                          ⭐ {submission.rating}
                        </span>
                      )}

                    </div>

                  </div>

                </div>

                <span
                  className={`rounded-full border px-4 py-2 text-sm font-semibold ${verdictStyle(
                    submission.verdict
                  )}`}
                >
                  {verdictText(submission.verdict)}
                </span>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default RecentActivity;