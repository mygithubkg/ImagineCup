import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import Scanner from './pages/Scanner'
import ResultPage from './pages/ResultPage'
import HistoryPage from './pages/HistoryPage'
import ContactPage from './pages/ContactPage'
import { LanguageProvider } from './contexts/LanguageContext'
import ProtectedRoute from './components/ProtectedRoute'
import React from 'react'

// Simple placeholder component for unimplemented pages
const PlaceholderPage = ({ title }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-6">This page is coming soon!</p>
        <a href="/" className="text-green-600 hover:text-green-700 font-semibold">
          ← Back to Home
        </a>
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          
          {/* Protected Routes - Require Authentication */}
          <Route path="/scan" element={<ProtectedRoute><Scanner /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          
          {/* Public Routes */}
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Placeholder routes */}
          <Route path="/features" element={<PlaceholderPage title="Features" />} />
          <Route path="/pricing" element={<PlaceholderPage title="Pricing" />} />
          <Route path="/demo" element={<PlaceholderPage title="Demo" />} />
          <Route path="/help" element={<PlaceholderPage title="Help Center" />} />
          <Route path="/community" element={<PlaceholderPage title="Community" />} />
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
