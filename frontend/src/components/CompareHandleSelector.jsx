import { useEffect, useState } from "react";
import { getDashboard, compareHandles } from "../services/dashboardService";
function CompareHandleSelector({ onCompare }) {
  const [handles, setHandles] = useState([]);
  const [handle1, setHandle1] = useState("");
  const [handle2, setHandle2] = useState("");
  const [handle3, setHandle3] = useState("");
  const handleCompare = async () => {
  try {
    const selectedHandles = [handle1, handle2];

    if (handle3) {
      selectedHandles.push(handle3);
    }

    const data = await compareHandles(selectedHandles);

    onCompare(data.comparisonData);
  } catch (error) {
    console.error(error);
  }
};
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

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-white">Compare Handles</h2>

      <p className="mt-2 text-slate-400">
        Select up to three saved Codeforces handles to compare.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <select value={handle1}
        onChange={(e)=>setHandle1(e.target.value)}
            className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-3 text-white outline-none transition focus:border-indigo-500">
          <option value="">Select Handle 1</option>

          {handles.map((item) => (
            <option key={item.handle} value={item.handle}>
              {item.handle}
            </option>
          ))}
        </select>

        <select 
        value={handle2}
        onChange={(e)=>{setHandle2(e.target.value)}}
        className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-3 text-white outline-none transition focus:border-indigo-500">
          <option value="">Select Handle 2</option>

          {handles.map((item) => (
            <option key={item.handle} value={item.handle}>
              {item.handle}
            </option>
          ))}
        </select>

        <select
        value={handle3}
        onChange={(e)=>{setHandle3(e.target.value())}}
         className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-3 text-white outline-none transition focus:border-indigo-500">
          <option value="">Optional Handle 3</option>

          {handles.map((item) => (
            <option key={item.handle} value={item.handle}>
              {item.handle}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 flex justify-center">
        <button 
        onClick={handleCompare}
        disabled={!handle1||!handle2}
        className="w-48 rounded-2xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-500">
          Compare
        </button>
      </div>
    </div>
  );
}

export default CompareHandleSelector;
