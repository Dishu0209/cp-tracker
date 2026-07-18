import Navbar from "../components/Navbar";
import WelcomeBanner from "../components/WelcomeBanner";
import StatCard from "../components/StatCard";
import RecentActivity from "../components/RecentActivity";
import { useState, useEffect } from "react";
import { getMe } from "../services/authService";
import {
  getDashboard,
  getDashboardDetails,
} from "../services/dashboardService";
import HandleSelector from "../components/HandleSelector";
import ProfileCard from "../components/ProfileCard";
function Dashboard() {
  const [user, setUser] = useState(null);
  const [handles, setHandles] = useState([]);
  const [selectedHandle, setSelectedHandle] = useState(null);
  const [dashboardDetails, setDashboardDetails] = useState(null);
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
  useEffect(() => {
    if (!selectedHandle) return;

    const fetchDashboardDetails = async () => {
      try {
        const data = await getDashboardDetails(selectedHandle.handle);
        console.log(data);
        setDashboardDetails(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardDetails();
  }, [selectedHandle]);
  useEffect(() => {
    console.log(dashboardDetails);
  }, [dashboardDetails]);
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="mx-auto max-w-7xl p-6">
        <WelcomeBanner user={user} />

        <HandleSelector
          handles={handles}
          selectedHandle={selectedHandle}
          setSelectedHandle={setSelectedHandle}
        />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <StatCard
            title="Total Solved"
            value={dashboardDetails?.analytics?.uniqueSolvedProblems || 0}
          />

          <StatCard
            title="Max Rating"
            value={dashboardDetails?.profile?.maxRating || 0}
          />

          <StatCard
            title="Total Contests"
            value={dashboardDetails?.ratingHistory?.length || 0}
          />

          <StatCard title="Handles" value={handles.length} />
        </div>
        {dashboardDetails && (
  <ProfileCard profile={dashboardDetails.profile} />
)}
        <div className="mt-8">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
