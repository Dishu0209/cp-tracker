import { useState } from "react";
import { deleteHandle, markOwnHandle } from "../services/handleService";

function HandleCard({
  handle,
  selectedHandle,
  setSelectedHandle,
  setHandles,
  refreshDashboard,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const ok = window.confirm(
      `Delete "${handle.handle}" from your dashboard?`
    );

    if (!ok) return;

    try {
      setLoading(true);

      await deleteHandle(handle._id);

      if (selectedHandle?.handle === handle.handle) {
        setSelectedHandle(null);
      }

      await refreshDashboard();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Unable to delete handle."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarkOwn = async () => {
    try {
      setLoading(true);

      await markOwnHandle(handle._id);

      await refreshDashboard();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Unable to update handle."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.18)]">

      {/* Glow */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="relative z-10">

        <div className="flex items-start justify-between gap-4">

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <span className="text-2xl">👤</span>

              <h3 className="text-2xl font-bold text-white">
                {handle.handle}
              </h3>

            </div>

            <p className="mt-2 text-sm text-slate-400">
              Saved Codeforces Handle
            </p>

            <div className="mt-5 flex flex-wrap gap-2">

              {handle.isOwn && (
                <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-semibold text-yellow-300">
                  ⭐ Own Handle
                </span>
              )}

              {selectedHandle?.handle === handle.handle && (
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  ✓ Currently Selected
                </span>
              )}

            </div>

          </div>

        </div>

        <div className="mt-8 flex flex-wrap gap-3">

          <button
            disabled={loading}
            onClick={handleMarkOwn}
            className="flex-1 rounded-xl border border-indigo-500 px-5 py-3 font-medium text-indigo-300 transition hover:bg-indigo-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Updating..."
              : handle.isOwn
              ? "Remove Own"
              : "Mark as Own"}
          </button>

          <button
            disabled={loading}
            onClick={handleDelete}
            className="rounded-xl border border-red-500 px-5 py-3 font-medium text-red-400 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default HandleCard;