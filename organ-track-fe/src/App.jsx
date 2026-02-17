import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import Home from "./pages/Home";
import Report from "./pages/Report";
import CheckIn from "./pages/CheckIn";
import TrackSyms from "./pages/TrackSyms";
import Settings from "./pages/Settings";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GetStarted from "./pages/GetStarted";
import LandingPage from "./pages/LandingPage";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages WITHOUT Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/Landing" element={<LandingPage />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        {/* Pages WITH Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/track" element={<TrackSyms />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
