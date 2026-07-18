function ProfileCard({ profile }) {
  return (
    <div className="mt-8 rounded-xl bg-slate-900 p-6 shadow-lg">
      <div className="flex items-center gap-5">
        <img
          src={profile?.avatar}
          alt="Avatar"
          className="h-20 w-20 rounded-full border-2 border-slate-700"
        />

        <div>
          <h2 className="text-2xl font-bold text-white">
            {profile?.handle}
          </h2>

          <p className="text-gray-400">
            {profile?.rank}
          </p>

          <p className="text-gray-400">
            Max Rank: {profile?.maxRank}
          </p>

          <p className="text-gray-400">
            Rating: {profile?.rating}
          </p>

          <p className="text-gray-400">
            Max Rating: {profile?.maxRating}
          </p>

          <p className="text-gray-400">
            Organization: {profile?.organization || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;