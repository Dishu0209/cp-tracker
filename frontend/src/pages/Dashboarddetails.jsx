import { useParams } from "react-router-dom";

function DashboardDetails() {
  const { handle } = useParams();

  return <h1>{handle} Dashboard</h1>;
}

export default DashboardDetails;