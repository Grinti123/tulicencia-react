import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition";
import ExamplePage from "./pages/ExamplePage";
import UserDashboard from "./pages/UserDashboard";
import TwoStepAuthentication from "./pages/TwoStepAuthentication";
import Procedures from "./components/dashboard/Procedures";
import Profile from "./components/dashboard/Profile";
import UpdatePassword from "./components/dashboard/UpdatePassword";
import NewProcedure from "./components/dashboard/NewProcedure";
import Payments from "./components/dashboard/Payments";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsCondition />} />
        <Route path="/example" element={<ExamplePage />} />
        <Route path="/dashboard" element={<UserDashboard />}>
          <Route index element={<Procedures />} />
          <Route path="procedures" element={<Procedures />} />
          <Route path="profile" element={<Profile />} />
          <Route path="password" element={<UpdatePassword />} />
          <Route path="new-procedure" element={<NewProcedure />} />
          <Route path="payments" element={<Payments />} />
        </Route>
        <Route path="/twostepauth" element={<TwoStepAuthentication />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;