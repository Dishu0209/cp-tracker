function CompareWinnerCards({ comparisonData }) {
  if (!comparisonData || comparisonData.length === 0) return null;

  const users = comparisonData.map((user) => ({
    ...user,
    accuracy:
      user.totalSubmission === 0
        ? 0
        : Number(
            ((user.acceptedSubmissions / user.totalSubmission) * 100).toFixed(
              1,
            ),
          ),
  }));

  const getWinner = (key) => {
    const sorted = [...users].sort((a, b) => b[key] - a[key]);

    return {
      winner: sorted[0],
      runnerUp: sorted[1],
      lead:
        sorted.length > 1
          ? Number(
              (sorted[0][key] - sorted[1][key]).toFixed(
                key === "accuracy" ? 1 : 0,
              ),
            )
          : 0,
    };
  };

  const highestRating = getWinner("rating");
  const highestMaxRating = getWinner("maxRating");
  const mostSolved = getWinner("uniqueSolvedProblems");
  const bestAccuracy = getWinner("accuracy");

  const metricsWon = {};

  [
    highestRating.winner.handle,
    highestMaxRating.winner.handle,
    mostSolved.winner.handle,
    bestAccuracy.winner.handle,
  ].forEach((handle) => {
    metricsWon[handle] = (metricsWon[handle] || 0) + 1;
  });

  const overallWinner = Object.entries(metricsWon).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const cards = [
    {
      emoji: "🏆",
      title: "Highest Rating",
      winner: highestRating.winner.handle,
      value: highestRating.winner.rating,
      lead: `+${highestRating.lead} Rating`,
      color: "from-indigo-500/20 to-indigo-600/5",
      border: "border-indigo-500/30",
      badge: "Rating Leader",
    },
    {
      emoji: "📈",
      title: "Highest Max Rating",
      winner: highestMaxRating.winner.handle,
      value: highestMaxRating.winner.maxRating,
      lead: `+${highestMaxRating.lead} Rating`,
      color: "from-cyan-500/20 to-cyan-600/5",
      border: "border-cyan-500/30",
      badge: "Peak Rating",
    },
    {
      emoji: "🧩",
      title: "Most Solved",
      winner: mostSolved.winner.handle,
      value: highestMaxRating.winner
        ? mostSolved.winner.uniqueSolvedProblems
        : 0,
      lead: `+${mostSolved.lead} Problems`,
      color: "from-violet-500/20 to-violet-600/5",
      border: "border-violet-500/30",
      badge: "Problem Solver",
    },
    {
      emoji: "🎯",
      title: "Best Accuracy",
      winner: bestAccuracy.winner.handle,
      value: `${bestAccuracy.winner.accuracy}%`,
      lead: `+${bestAccuracy.lead}%`,
      color: "from-emerald-500/20 to-emerald-600/5",
      border: "border-emerald-500/30",
      badge: "Precision",
    },
  ];

  return (
    <>
      {/* ================= HERO SECTION ================= */}

      <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
        {/* Background Glow */}
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Trophy */}
        <div className="absolute right-8 top-4 hidden lg:block text-[180px] opacity-5 select-none">
          🏆
        </div>

        <div className="relative grid lg:grid-cols-3 gap-10 p-8 lg:p-10">
          {/* LEFT */}

          <div className="lg:col-span-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1 text-sm text-yellow-300 mb-5">
              🏆 Comparison Summary
            </div>

            <h2 className="text-4xl font-bold text-white leading-tight">
              Overall Leader
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 px-5 py-2 text-xl font-bold text-black shadow-lg">
                👑 {overallWinner[0]}
              </div>

              <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                Leads in {overallWinner[1]} of 4 metrics
              </span>
            </div>

            <p className="mt-6 max-w-2xl text-slate-300 leading-8">
              Based on Codeforces performance analytics including current
              rating, maximum rating, unique solved problems and submission
              accuracy,{" "}
              <span className="font-semibold text-white">
                {overallWinner[0]}
              </span>{" "}
              currently demonstrates the strongest overall competitive
              programming profile among the selected handles.
            </p>

            {/* Metric Chips */}

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3">
                <div className="text-xs uppercase tracking-wide text-slate-400">
                  Rating
                </div>

                <div className="mt-1 font-semibold text-indigo-300">
                  🏆 {highestRating.winner.handle}
                </div>
              </div>

              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3">
                <div className="text-xs uppercase tracking-wide text-slate-400">
                  Max Rating
                </div>

                <div className="mt-1 font-semibold text-cyan-300">
                  📈 {highestMaxRating.winner.handle}
                </div>
              </div>

              <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-3">
                <div className="text-xs uppercase tracking-wide text-slate-400">
                  Solved
                </div>

                <div className="mt-1 font-semibold text-violet-300">
                  🧩 {mostSolved.winner.handle}
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                <div className="text-xs uppercase tracking-wide text-slate-400">
                  Accuracy
                </div>

                <div className="mt-1 font-semibold text-emerald-300">
                  🎯 {bestAccuracy.winner.handle}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex items-center">
            <div className="relative w-full overflow-hidden rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 via-slate-900 to-slate-900 p-8 shadow-xl">
              <div className="absolute -right-6 -top-8 text-[110px] opacity-10">
                👑
              </div>

              <div className="text-sm uppercase tracking-[0.3em] text-yellow-400">
                Performance Score
              </div>

              <div className="mt-5 flex items-end gap-2">
                <span className="text-6xl font-black text-white">
                  {overallWinner[1]}
                </span>

                <span className="pb-2 text-xl text-slate-400">/ 4</span>
              </div>

              <div className="mt-3 text-slate-300">Metrics Won</div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 transition-all duration-700"
                  style={{
                    width: `${(overallWinner[1] / 4) * 100}%`,
                  }}
                />
              </div>

              <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800/60 p-4">
                <div className="text-xs uppercase text-slate-400">Status</div>

                <div className="mt-2 text-lg font-semibold text-emerald-400">
                  Dominating Comparison
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= WINNER CARDS ================= */}

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-2xl border ${card.border}
            bg-gradient-to-br ${card.color} backdrop-blur-sm
            transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-3xl" />
            </div>

            {/* Watermark */}
            <div className="absolute right-4 top-2 text-7xl opacity-5 select-none">
              {card.emoji}
            </div>

            <div className="relative p-6">
              {/* Badge */}
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                {card.badge}
              </div>

              {/* Emoji */}
              <div className="mt-5 text-4xl">{card.emoji}</div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-semibold text-white">
                {card.title}
              </h3>

              {/* Winner */}
              <div className="mt-5">
                <div className="text-xs uppercase tracking-widest text-slate-400">
                  Winner
                </div>

                <div className="mt-2 text-2xl font-bold text-white break-all">
                  {card.winner}
                </div>
              </div>

              {/* Value */}
              <div className="mt-6">
                <div className="text-xs uppercase tracking-widest text-slate-400">
                  Value
                </div>

                <div className="mt-2 text-4xl font-black text-white">
                  {card.value}
                </div>
              </div>

              {/* Lead */}
              <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400">
                    Lead
                  </div>

                  <div className="mt-1 font-semibold text-emerald-400">
                    {card.lead}
                  </div>
                </div>

                <div className="text-2xl">🥇</div>
              </div>
            </div>

            {/* Bottom Border Animation */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 transition-all duration-500 group-hover:w-full" />
          </div>
        ))}
      </div>

      {/* ================= FOOTER SUMMARY ================= */}

      <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/60 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Comparison Insight</h3>

            <p className="mt-2 max-w-3xl text-slate-300 leading-7">
              This comparison is based on publicly available Codeforces
              statistics. A higher current rating reflects recent competitive
              performance, maximum rating indicates peak achievement, solved
              problems demonstrate experience, while submission accuracy
              represents consistency.
            </p>
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-6 py-5 text-center">
            <div className="text-xs uppercase tracking-widest text-yellow-300">
              Overall Champion
            </div>

            <div className="mt-2 text-3xl font-black text-white break-all">
              👑 {overallWinner[0]}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompareWinnerCards;
