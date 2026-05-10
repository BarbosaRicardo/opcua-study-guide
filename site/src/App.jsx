import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Intro from './pages/Intro'
import Architecture from './pages/Architecture'
import InfoModel from './pages/InfoModel'
import Services from './pages/Services'
import Security from './pages/Security'
import Subscriptions from './pages/Subscriptions'
import Transport from './pages/Transport'
import IgnitionIntegration from './pages/IgnitionIntegration'
import Troubleshoot from './pages/Troubleshoot'
import Lab from './pages/Lab'
import Flashcards from './pages/Flashcards'

export default function App() {
  return (
    <div className="flex min-h-screen font-sans">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto pt-14 lg:pt-0">
        <Routes>
          <Route path="/"              element={<Intro />} />
          <Route path="/architecture"  element={<Architecture />} />
          <Route path="/infomodel"     element={<InfoModel />} />
          <Route path="/services"      element={<Services />} />
          <Route path="/security"      element={<Security />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/transport"     element={<Transport />} />
          <Route path="/ignition"      element={<IgnitionIntegration />} />
          <Route path="/troubleshoot"  element={<Troubleshoot />} />
          <Route path="/lab"           element={<Lab />} />
          <Route path="/flashcards"    element={<Flashcards />} />
        </Routes>
      </main>
    </div>
  )
}
