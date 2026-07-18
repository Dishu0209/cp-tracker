function ProfileCard({ profile }) {
  return (
    <div className="relative mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.15)]">
      {/* Background Glow */}
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
        {/* Avatar */}
        <div className="flex justify-center">
          <img
            src={profile?.avatar}
            alt="Avatar"
            className="h-28 w-28 rounded-full border-4 border-indigo-500/40 object-cover shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-bold text-white">
              {profile?.handle}
            </h2>

            <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-semibold capitalize text-indigo-300">
              {profile?.rank || "Unrated"}
            </span>
          </div>

          <p className="mt-2 text-slate-400">
            {profile?.organization || "No organization available"}
          </p>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-slate-800/70 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Rating
              </p>

              <p className="mt-2 text-2xl font-bold text-white">
                {profile?.rating ?? "N/A"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/70 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Max Rating
              </p>

              <p className="mt-2 text-2xl font-bold text-green-400">
                {profile?.maxRating ?? "N/A"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/70 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Rank
              </p>

              <p className="mt-2 text-lg font-semibold capitalize text-white">
                {profile?.rank || "Unrated"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/70 p-4">
              <p className="text-xs uppercase tracking-wider text-slate-400">
                Max Rank
              </p>

              <p className="mt-2 text-lg font-semibold capitalize text-amber-400">
                {profile?.maxRank || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;