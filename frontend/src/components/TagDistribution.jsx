function TagDistribution({ distribution }) {
  const tags = Object.entries(distribution).sort((a, b) => b[1] - a[1]);

  return (
    <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Tag Distribution
      </h2>

      <div className="max-h-96 space-y-3 overflow-y-auto pr-2">
        {tags.map(([tag, count]) => (
          <div
            key={tag}
            className="flex items-center justify-between rounded-lg bg-slate-800 px-4 py-3"
          >
            <span className="font-medium text-white">
              {tag}
            </span>

            <span className="rounded-md bg-green-600 px-3 py-1 text-sm font-semibold text-white">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagDistribution;