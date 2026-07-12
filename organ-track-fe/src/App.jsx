import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import EachOrgan from "./pages/EachOrgan";
import Home from "./pages/Home";
import Report from "./pages/Report";
import TrackSyms from "./pages/TrackSyms";
import Settings from "./pages/Settings1";
import Terms from "./pages/Terms";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Questions from "./pages/Questions";
import Thanks from "./pages/Thanks";
import LandingPage from "./pages/LandingPage";
import ReportInput from "./pages/reportinput";
import EditProfile from "./pages/EditProfile";
import Countdown from "./pages/Countdown";
import PrivateRoute from "./components/PrivateRoute";
import AiTest from "./pages/AiTest";
import TrackAnalysisPage from "./pages/Track";
import ReportDetails from "./pages/ReportDetails";
import ReportBubble from "./components/ReportBubble";

function App() {
  return (
    <BrowserRouter>
      <ReportBubble />
      <Routes>
        {/* Pages WITHOUT Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/Landing" element={<LandingPage />} />
        <Route path="/ai" element={<AiTest />} />

        {/* Pages WITH Navbar */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkin"
            element={
              <PrivateRoute>
                <Countdown />
              </PrivateRoute>
            }
          />
          <Route
            path="/EditProfile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/track"
            element={
              <PrivateRoute>
                <TrackSyms />
              </PrivateRoute>
            }
          />
          <Route
            path="/questions/:organId"
            element={
              <PrivateRoute>
                <Questions />
              </PrivateRoute>
            }
          />
          <Route
            path="/trackResult/:reportId"
            element={
              <PrivateRoute>
                <TrackAnalysisPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/each-organ/:organId"
            element={
              <PrivateRoute>
                <EachOrgan />
              </PrivateRoute>
            }
          />

          <Route
            path="/report-details"
            element={
              <PrivateRoute>
                <ReportDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/ReportInput"
            element={
              <PrivateRoute>
                <ReportInput />
              </PrivateRoute>
            }
          />

          <Route
            path="/report"
            element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            }
          />
          <Route
            path="/thanks/:type/:reportId?"
            element={
              <PrivateRoute>
                <Thanks />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
