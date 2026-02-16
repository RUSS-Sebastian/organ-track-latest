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
import Questions from "./pages/Questions";
import Thanks from "./pages/Thanks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages WITHOUT Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/Terms" element={<Terms />} />

        {/* Pages WITH Navbar */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<Report />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/track" element={<TrackSyms />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/questions/:organId?" element={<Questions />} />
          <Route path="/thanks/:type" element={<Thanks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
