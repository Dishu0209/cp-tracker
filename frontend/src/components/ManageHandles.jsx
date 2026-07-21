import { useState } from "react";

import HandleCard from "./HandleCard";
import AddHandleModal from "./AddHandleModal";

function ManageHandles({
  handles,
  setHandles,
  selectedHandle,
  setSelectedHandle,
  refreshDashboard,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">

        {/* Header */}
        <div
          onClick={() => setExpanded(!expanded)}
          className="cursor-pointer p-6 transition hover:bg-slate-800/40"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex items-center gap-3">

                <h2 className="text-2xl font-bold text-white">
                  Manage Handles
                </h2>

                <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-sm font-semibold text-indigo-300">
                  {handles.length}
                </span>

              </div>

              <p className="mt-2 text-slate-400">
                Add, remove and manage your saved Codeforces handles.
              </p>
            </div>

            <div className="flex items-center gap-3">

              <span className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300">
                {expanded ? "▲ Hide" : "▼ Show"}
              </span>

            </div>

          </div>
        </div>

        {/* Body */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            expanded
              ? "max-h-[2500px] opacity-100"
              : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="border-t border-slate-800 p-6">

            <div className="mb-6 flex justify-end">

              <button
                onClick={() => setOpenModal(true)}
                className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
              >
                + Add Handle
              </button>

            </div>

            {handles.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 py-12 text-center">

                <div className="text-5xl">📂</div>

                <p className="mt-4 text-lg font-semibold text-white">
                  No Handles Added
                </p>

                <p className="mt-2 text-slate-400">
                  Click on <span className="font-semibold text-indigo-400">+ Add Handle</span> to save your first Codeforces profile.
                </p>

              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">

                {handles.map((item) => (
                  <HandleCard
                    key={item._id}
                    handle={item}
                    selectedHandle={selectedHandle}
                    setSelectedHandle={setSelectedHandle}
                    setHandles={setHandles}
                    refreshDashboard={refreshDashboard}
                  />
                ))}

              </div>
            )}

          </div>
        </div>

      </div>

      <AddHandleModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        handles={handles}
        setHandles={setHandles}
        refreshDashboard={refreshDashboard}
      />
    </>
  );
}

export default ManageHandles;