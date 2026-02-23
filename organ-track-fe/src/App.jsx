import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import Home from "./pages/Home";
import Report from "./pages/Report";
import CheckIn from "./pages/CheckIn";
import TrackSyms from "./pages/TrackSyms";
import Settings from "./pages/Settings1";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GetStarted from "./pages/GetStarted";
import Questions from "./pages/Questions";
import Thanks from "./pages/Thanks";
import LandingPage from "./pages/LandingPage";
import EditProfile from "./pages/EditProfile";
import TestAPI from "./components/TestAPI";
import Countdown from "./pages/Countdown";
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

        {/* Pages WITH Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/track" element={<TrackSyms />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/questions/:organId?" element={<Questions />} />
          <Route path="/thanks/:type" element={<Thanks />} />
          <Route path="/EditProfile" element={<EditProfile />} />
          <Route path="/Countdown" element={<Countdown />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/* */
