import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DashboardDetails from "./pages/DashboardDetails";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <BrowserRouter>
<Routes>
  <Route path="/" element={<Navigate to="/login" replace />} />
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/dashboard" element={<Dashboard/>}/>
  <Route path="/dashboard/:handle" element={<DashboardDetails/>}/>
  <Route path="/compare" element={<Compare/>}/>
  <Route path="*" element={<NotFound/>}/>

</Routes>
    </BrowserRouter>
  );
}

export default App;