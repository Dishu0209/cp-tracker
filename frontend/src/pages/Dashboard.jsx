import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import WelcomeBanner from "../components/WelcomeBanner";
import HandleSelector from "../components/HandleSelector";
import StatCard from "../components/StatCard";
import ProfileCard from "../components/ProfileCard";
import RatingChart from "../components/RatingChart";
import RatingDistributionChart from "../components/RatingDistributionChart";
import TagDistribution from "../components/TagDistribution";
import RecentActivity from "../components/RecentActivity";
import DashboardSkeleton from "../components/DashboardSkeleton";

import { getMe } from "../services/authService";
import {
  getDashboard,
  getDashboardDetails,
} from "../services/dashboardService";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [handles, setHandles] = useState([]);
  const [selectedHandle, setSelectedHandle] = useState(null);
  const [dashboardDetails, setDashboardDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Logged In User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  // Fetch Dashboard Handles
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();

        setHandles(data.dashboardData);

        const ownHandle = data.dashboardData.find((item) => item.isOwn);

        if (data.dashboardData.length > 0) {
          setSelectedHandle(ownHandle || data.dashboardData[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  // Fetch Selected Handle Details
  useEffect(() => {
    if (!selectedHandle) {
      setLoading(false);
      return;
    }

    const fetchDashboardDetails = async () => {
      try {
        setLoading(true);

        const data = await getDashboardDetails(selectedHandle.handle);

        setDashboardDetails(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardDetails();
  }, [selectedHandle]);

  if (loading) {
    return (
      <>
        <Navbar />
        <DashboardSkeleton />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <WelcomeBanner user={user} />

        <HandleSelector
          handles={handles}
          selectedHandle={selectedHandle}
          setSelectedHandle={setSelectedHandle}
        />

        {handles.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 py-20 text-center">
            <h2 className="text-2xl font-bold text-white">
              No Codeforces Handle Found
            </h2>

            <p className="mt-3 text-slate-400">
              Add your first Codeforces handle to begin tracking your
              competitive programming journey.
            </p>
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Solved Problems"
                value={dashboardDetails?.analytics?.uniqueSolvedProblems || 0}
              />

              <StatCard
                title="Current Rating"
                value={dashboardDetails?.profile?.rating || "Unrated"}
              />

              <StatCard
                title="Max Rating"
                value={dashboardDetails?.profile?.maxRating || 0}
              />

              <StatCard
                title="Contests"
                value={dashboardDetails?.ratingHistory?.length || 0}
              />
            </div>

            {/* Profile */}
            {dashboardDetails && (
              <ProfileCard profile={dashboardDetails.profile} />
            )}

            {/* Performance Analytics */}
            {dashboardDetails && (
              <>
                <div className="mt-10 mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    Performance Analytics
                  </h2>
                  <p className="text-slate-400">
                    Rating trends and performance distribution.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                  <RatingChart ratingHistory={dashboardDetails.ratingHistory} />

                  <RatingDistributionChart
                    distribution={dashboardDetails.analytics.ratingDistribution}
                  />
                </div>
              </>
            )}

            {/* Programming Insights */}
            {dashboardDetails && (
              <>
                <div className="mt-10 mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    Programming Insights
                  </h2>
                  <p className="text-slate-400">
                    Most solved problem tags from your submissions.
                  </p>
                </div>

                <TagDistribution
                  distribution={dashboardDetails.analytics.tagDistribution}
                />
              </>
            )}

            {/* Recent Activity */}
            {/* Recent Activity */}
            {dashboardDetails && (
              <div className="mt-10">
                <RecentActivity
                  submissions={dashboardDetails.recentSubmissions || []}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
