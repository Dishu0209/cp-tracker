import { useEffect, useMemo, useState } from "react";
import {
  getDashboard,
  compareHandles,
} from "../../services/dashboardService";

function CompareHandleSelector({ onCompare }) {
  const [handles, setHandles] = useState([]);

  const [selectedHandles, setSelectedHandles] = useState([
    "",
    "",
  ]);

  const [visibleSelectors, setVisibleSelectors] = useState(2);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHandles = async () => {
      try {
        const data = await getDashboard();
        setHandles(data.dashboardData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHandles();
  }, []);

  const updateHandle = (index, value) => {
    const updated = [...selectedHandles];
    updated[index] = value;
    setSelectedHandles(updated);
  };

  const addSelector = () => {
    if (visibleSelectors >= 5) return;

    setVisibleSelectors((prev) => prev + 1);

    setSelectedHandles((prev) => [...prev, ""]);
  };

  const handleCompare = async () => {
    const filteredHandles = selectedHandles.filter(
      (item) => item !== ""
    );

    if (filteredHandles.length < 2) {
      alert("Please select at least 2 handles.");
      return;
    }

    const unique = new Set(
      filteredHandles.map((item) => item.toLowerCase())
    );

    if (unique.size !== filteredHandles.length) {
      alert("Duplicate handles are not allowed.");
      return;
    }

    try {
      setLoading(true);

      const data = await compareHandles(filteredHandles);

      onCompare(data.comparisonData);
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Comparison failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const getDisabled = (currentIndex) => {
    return selectedHandles.filter(
      (_, index) => index !== currentIndex
    );
  };
  return (
  <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

    <h2 className="text-2xl font-bold text-white">
      Compare Handles
    </h2>

    <p className="mt-2 text-slate-400">
      Compare between <span className="font-semibold text-indigo-400">2 and 5</span> saved Codeforces handles.
    </p>

    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">

      {selectedHandles
        .slice(0, visibleSelectors)
        .map((selected, index) => (

          <select
            key={index}
            value={selected}
            onChange={(e) =>
              updateHandle(index, e.target.value)
            }
            className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-3 text-white outline-none transition focus:border-indigo-500"
          >
            <option value="">
             {index < 2
  ? `Required Handle ${index + 1}`
  : `Optional Handle ${index + 1}`}
            </option>

            {handles.map((item) => (
              <option
                key={item.handle}
                value={item.handle}
                disabled={getDisabled(index).includes(
                  item.handle
                )}
              >
                {item.handle}
              </option>
            ))}

          </select>

      ))}
          </div>

    {visibleSelectors < 5 && (
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={addSelector}
          className="rounded-xl border border-indigo-500 px-5 py-2 font-medium text-indigo-400 transition hover:bg-indigo-500 hover:text-white"
        >
          + Add Another Handle
        </button>
      </div>
    )}

    <div className="mt-8 flex justify-center">
      <button
        onClick={handleCompare}
        disabled={
          loading ||
          !selectedHandles[0] ||
          !selectedHandles[1]
        }
        className="w-52 rounded-2xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Comparing..." : "Compare"}
      </button>
    </div>
  </div>
);
}

export default CompareHandleSelector;