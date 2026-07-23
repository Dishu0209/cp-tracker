import HandleCard from "./HandleCard";

function HandleSelector({
  handles,
  selectedHandle,
  setSelectedHandle,
}) {
  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Current Handle
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {selectedHandle?.handle || "No Handle Selected"}
          </h2>

          <div className="mt-3 flex flex-wrap gap-3">

            {selectedHandle?.rank && (
              <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-sm font-medium text-indigo-300">
                {selectedHandle.rank}
              </span>
            )}

            {selectedHandle?.rating && (
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-medium text-emerald-300">
                Rating {selectedHandle.rating}
              </span>
            )}

            {selectedHandle?.maxRating && (
              <span className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-medium text-amber-300">
                Max {selectedHandle.maxRating}
              </span>
            )}

            {selectedHandle?.isOwn && (
              <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-sm font-medium text-yellow-300">
                ⭐ Own Handle
              </span>
            )}

          </div>
        </div>

        <div className="w-full lg:w-80">

          <label className="mb-2 block text-sm font-medium text-slate-400">
            Switch Handle
          </label>

          <select
            value={selectedHandle?.handle || ""}
            onChange={(e) => {
              const handle = handles.find(
                (item) => item.handle === e.target.value
              );

              setSelectedHandle(handle);
            }}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white shadow-lg outline-none transition-all duration-300 hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          >
            {handles.map((item) => (
              <option
                key={item.handle}
                value={item.handle}
              >
                {item.handle}
              </option>
            ))}
          </select>

        </div>

      </div>

    </div>
  );
}

export default HandleSelector;