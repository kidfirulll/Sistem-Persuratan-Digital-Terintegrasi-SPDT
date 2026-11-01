import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          {/* Landing Page */}
          <Route index element={<LandingPage />} />
          
          {/* User Dashboard */}
          <Route path="dashboard" element={<UserDashboard />} />

          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
