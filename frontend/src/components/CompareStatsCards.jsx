function CompareStatsCards({ comparisonData }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {comparisonData.map((user) => (
        <div
          key={user.handle}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
        >
          {/* Header */}
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-white">
              {user.handle}
            </h2>

            <p className="mt-1 capitalize text-indigo-400">
              {user.rank}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Current Rating
              </span>

              <span className="text-xl font-bold text-white">
                {user.rating || "Unrated"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Max Rating
              </span>

              <span className="text-xl font-bold text-green-400">
                {user.maxRating || "-"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Solved Problems
              </span>

              <span className="font-semibold text-white">
                {user.uniqueSolvedProblems}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Accepted
              </span>

              <span className="font-semibold text-white">
                {user.acceptedSubmissions}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Total Submissions
              </span>

              <span className="font-semibold text-white">
                {user.totalSubmission}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                Accuracy
              </span>

              <span className="font-semibold text-cyan-400">
                {user.totalSubmission
                  ? (
                      (user.acceptedSubmissions /
                        user.totalSubmission) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CompareStatsCards;