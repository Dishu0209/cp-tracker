import { useState } from "react";
import CompareStatsCards from "../components/CompareStatsCards";
import Navbar from "../components/Navbar";
import CompareHandleSelector from "../components/CompareHandleSelector";
import ComparePerformanceChart from "../components/ComparePerformanceChart";
import CompareTagChart from "../components/CompareTagChart";
import CompareWinnerCards from "../components/CompareWinnerCards";
import CompareRatingDistributionChart from "../components/CompareRatingDistributionChart";
import CompareTable from "../components/CompareTable";
function Compare() {
  const [comparisonData, setComparisonData] = useState([]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-extrabold text-white">
            Compare Handles
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Compare up to three saved Codeforces handles and analyze ratings,
            solved problems, submissions, and overall competitive programming
            performance.
          </p>
        </div>

        <CompareHandleSelector onCompare={setComparisonData} />

        {comparisonData.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 py-20 text-center">
            <h2 className="text-2xl font-bold text-white">No Comparison Yet</h2>

            <p className="mt-3 text-slate-400">
              Choose at least two handles and click Compare to generate
              analytics.
            </p>
          </div>
        ) : (
          <div className="mt-10">
            {/* Comparison cards will come here */}
            <CompareWinnerCards comparisonData={comparisonData} />
            <CompareTable comparisonData={comparisonData} />
            <ComparePerformanceChart comparisonData={comparisonData} />

            <CompareRatingDistributionChart comparisonData={comparisonData} />

            <CompareTagChart comparisonData={comparisonData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Compare;
