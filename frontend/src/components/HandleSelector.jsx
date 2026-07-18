function HandleSelector({
  handles,
  selectedHandle,
  setSelectedHandle,
}) {
  return (
    <div className="mt-8">
      <label className="mb-3 block text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
        Select Handle
      </label>

      <div className="relative w-full max-w-sm">
        <select
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-white shadow-lg outline-none transition-all duration-300 hover:border-indigo-500/40 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          value={selectedHandle?.handle || ""}
          onChange={(e) => {
            const handle = handles.find(
              (item) => item.handle === e.target.value
            );
            setSelectedHandle(handle);
          }}
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
  );
}

export default HandleSelector;