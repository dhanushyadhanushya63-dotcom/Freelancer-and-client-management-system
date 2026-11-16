import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import FreelancerDashboard from './views/freelancer/FreelancerDashboard';
import ClientDashboard from './views/client/ClientDashboard';
import ChatbotModal from './components/chatbot/ChatbotModal';

export default function App() {
  const { currentUser, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'login'

  // Logout Flow (Module 11 in Flowchart)
  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  return (
    <div className="relative min-h-screen antialiased" style={{ background: '#09090B', color: '#FFFFFF', fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>
      {/* Dynamic View Routing */}
      {!currentUser ? (
        currentPage === 'login' ? (
          <LoginView onBackToHome={() => setCurrentPage('home')} />
        ) : (
          <HomeView onNavigateLogin={() => setCurrentPage('login')} />
        )
      ) : currentUser.role === 'Freelancer' ? (
        <FreelancerDashboard onLogout={handleLogout} />
      ) : (
        <ClientDashboard onLogout={handleLogout} />
      )}

      {/* Persistent AI / Guided Support Chatbot (Module 9 in Flowchart) */}
      <ChatbotModal />
    </div>
  );
}
