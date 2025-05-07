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

// Import Procedure Pages
import ProceduresPage from "./pages/procedures";
import LicenseRenewal from "./pages/procedures/LicenseRenewal";
import LicenseRenewalInfo from "./pages/LicenseRenewal";
import LicenseRenewalUpload from "./pages/procedures/LicenseRenewalUpload";
import VehicleTransfer from "./pages/procedures/VehicleTransfer";

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

        {/* Procedure Routes */}
        <Route path="/procedures" element={<ProceduresPage />} />
        <Route path="/procedures/license-renewal" element={<LicenseRenewalInfo />} />
        <Route path="/procedures/license-renewal/form" element={<LicenseRenewal />} />
        <Route path="/procedures/license-renewal/upload" element={<LicenseRenewalUpload />} />
        <Route path="/procedures/vehicle-transfer" element={<VehicleTransfer />} />
        {/* Add other procedure routes as they are implemented */}
        <Route path="/procedures/:procedureType" element={<ProceduresPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;