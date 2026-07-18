function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="h-4 w-24 rounded bg-slate-700"></div>

      <div className="mt-5 h-10 w-20 rounded bg-slate-700"></div>
    </div>
  );
}

function SkeletonChart() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="h-6 w-44 rounded bg-slate-700"></div>

      <div className="mt-6 h-[320px] rounded-xl bg-slate-800"></div>
    </div>
  );
}

function SkeletonProfile() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <div className="flex items-center gap-6">
        <div className="h-28 w-28 rounded-full bg-slate-700"></div>

        <div className="flex-1">
          <div className="h-7 w-52 rounded bg-slate-700"></div>

          <div className="mt-3 h-4 w-36 rounded bg-slate-700"></div>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-slate-800 p-4"
              >
                <div className="h-3 w-20 rounded bg-slate-700"></div>

                <div className="mt-3 h-6 w-14 rounded bg-slate-700"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonList() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="h-6 w-44 rounded bg-slate-700"></div>

      <div className="mt-6 space-y-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
          >
            <div>
              <div className="h-4 w-48 rounded bg-slate-700"></div>

              <div className="mt-2 h-3 w-28 rounded bg-slate-700"></div>
            </div>

            <div className="h-8 w-20 rounded-full bg-slate-700"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-8">

        <div className="animate-pulse rounded-3xl bg-slate-900 p-8">
          <div className="h-6 w-36 rounded bg-slate-700"></div>

          <div className="mt-4 h-10 w-80 rounded bg-slate-700"></div>

          <div className="mt-6 h-5 w-96 rounded bg-slate-700"></div>
        </div>

        <div className="mt-8 h-14 w-72 animate-pulse rounded-2xl bg-slate-900"></div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        <div className="mt-8">
          <SkeletonProfile />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-2">
          <SkeletonChart />
          <SkeletonChart />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-2">
          <SkeletonList />
          <SkeletonList />
        </div>

      </div>
    </div>
  );
}

export default DashboardSkeleton;