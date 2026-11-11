import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import LandingPage from "./pages/LandingPage";
import PortalWarga from "./pages/PortalWarga";
import PortalPetugas from "./pages/PortalPetugas";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          {/* Landing Page */}
          <Route index element={<LandingPage />} />
          
          {/* Portal Warga (Mandatory NIK & WhatsApp Digital Receipt) */}
          <Route path="portal-warga" element={<PortalWarga />} />
          <Route path="dashboard" element={<Navigate to="/portal-warga" replace />} />

          {/* Dedicated Portal Petugas (RT, RW, Kasun, Kades with TTE Approval) */}
          <Route path="portal-petugas" element={<PortalPetugas />} />

          {/* Fallback to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
