import { useState } from "react";
import { addHandle } from "../../services/handleService";
import { toast } from "react-hot-toast";
function AddHandleModal({
  open,
  onClose,
  handles,
  setHandles,
  refreshDashboard,
}) {
  const [handle, setHandle] = useState("");
  const [isOwn, setIsOwn] = useState(true);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!handle.trim()) {
      toast.error("Please enter a Codeforces handle.");
      return;
    }

    const alreadyExists = handles.some(
      (item) => item.handle.toLowerCase() === handle.trim().toLowerCase(),
    );

    if (alreadyExists) {
      toast.error("Handle already exists.");
      return;
    }

    try {
      setLoading(true);

      await addHandle(handle.trim(), isOwn);
      await refreshDashboard();
      toast.success("Handle added successfully!");
      setHandle("");
      setIsOwn(true);

      onClose();

      await refreshDashboard();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to add handle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-5">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl">
        {/* Glow */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl"></div>

        <div className="relative z-10 p-8">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-xl text-slate-400 transition hover:text-white"
          >
            ✕
          </button>

          <h2 className="text-3xl font-bold text-white">
            Add Codeforces Handle
          </h2>

          <p className="mt-2 text-slate-400">
            Save another Codeforces account to your dashboard for tracking and
            comparison.
          </p>

          <form onSubmit={submitHandler} className="mt-8 space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold uppercase tracking-wider text-slate-300">
                Handle
              </label>

              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="tourist"
                autoFocus
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800/40 p-4 transition hover:border-indigo-500">
              <input
                type="checkbox"
                checked={isOwn}
                onChange={(e) => setIsOwn(e.target.checked)}
                className="h-5 w-5 accent-indigo-500"
              />

              <div>
                <p className="font-semibold text-white">Mark as Own Handle</p>

                <p className="text-sm text-slate-400">
                  This handle will be treated as your primary profile.
                </p>
              </div>
            </label>

            <div className="flex justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded-xl border border-slate-600 px-6 py-3 font-medium text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Adding Handle..." : "Add Handle"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddHandleModal;
