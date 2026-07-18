function HandleSelector({ handles, selectedHandle, setSelectedHandle }) {
  return (
    <div className="mt-6">
      <label className="mb-2 block text-sm font-medium text-gray-300">
        Select Handle
      </label>

      <select
        className="w-64 rounded-lg border border-slate-700 bg-slate-900 p-2 text-white outline-none"
        value={selectedHandle?.handle || ""}
        onChange={(e) => {
          const handle = handles.find(
            (item) => item.handle === e.target.value
          );
          setSelectedHandle(handle);
        }}
      >
        {handles.map((item) => (
          <option key={item.handle} value={item.handle}>
            {item.handle}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HandleSelector;