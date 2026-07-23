function ProfileCard({ profile }) {
  const stats = [
    {
      title: "Rating",
      value: profile?.rating ?? "N/A",
      color: "text-white",
      bg: "hover:border-indigo-500/40",
    },
    {
      title: "Max Rating",
      value: profile?.maxRating ?? "N/A",
      color: "text-emerald-400",
      bg: "hover:border-emerald-500/40",
    },
    {
      title: "Rank",
      value: profile?.rank || "Unrated",
      color: "text-indigo-300 capitalize",
      bg: "hover:border-indigo-500/40",
    },
    {
      title: "Max Rank",
      value: profile?.maxRank || "N/A",
      color: "text-amber-400 capitalize",
      bg: "hover:border-amber-500/40",
    },
  ];

  return (
    <div className="relative mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_45px_rgba(99,102,241,0.18)]">

      {/* Background Glow */}
      <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
      <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl"></div>

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center">

        {/* Avatar */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative">

            <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl"></div>

            <img
              src={profile?.avatar}
              alt="Avatar"
              className="relative h-32 w-32 rounded-full border-4 border-indigo-500/40 object-cover shadow-xl"
            />

            <div className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-2 border-slate-900 bg-emerald-500"></div>

          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-3">

            <h2 className="text-4xl font-bold tracking-tight text-white">
              {profile?.handle}
            </h2>

            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1 text-sm font-semibold capitalize text-indigo-300">
              {profile?.rank || "Unrated"}
            </span>

          </div>

          <p className="mt-3 text-slate-400">
            {profile?.organization || "No organization available"}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">

            <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
              👤 Codeforces Profile
            </span>

            {profile?.rating && (
              <span className="rounded-full bg-indigo-500/15 px-4 py-2 text-sm font-medium text-indigo-300">
                Rating {profile.rating}
              </span>
            )}

            {profile?.maxRating && (
              <span className="rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-300">
                Max {profile.maxRating}
              </span>
            )}

          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">

            {stats.map((stat) => (
              <div
                key={stat.title}
                className={`rounded-2xl border border-slate-800 bg-slate-800/40 p-5 transition-all duration-300 hover:-translate-y-1 ${stat.bg}`}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {stat.title}
                </p>

                <p
                  className={`mt-3 text-2xl font-bold ${stat.color}`}
                >
                  {stat.value}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProfileCard;