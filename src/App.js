import React, { useState, useEffect } from 'react';
import './App.css';
import PocketMoneyTracker from './components/PocketMoneyTracker';
import CharityTracker from './components/CharityTracker';
import PhotoSlideshow from './components/PhotoSlideshow';
import CalendarEvents from './components/CalendarEvents';
import TasksList from './components/TasksList';
import WeeklyReflection from './components/WeeklyReflection';
import { getWeeklyTheme } from './utils/themes';

function App() {
  const [currentTheme, setCurrentTheme] = useState(getWeeklyTheme());
  const [currentView, setCurrentView] = useState('dashboard');
  
  // Family data
  const [familyData, setFamilyData] = useState({
    children: [
      { name: 'Leni', age: 10, weeklyAmount: 10, jobs: ['Feed pets', 'Tidy room', 'Help with dishes'] },
      { name: 'Ayda', age: 7, weeklyAmount: 7, jobs: ['Make bed', 'Put toys away', 'Help set table'] },
      { name: 'Finn', age: 4, weeklyAmount: 4, jobs: ['Put shoes away', 'Help sort washing', 'Water plants'] }
    ],
    currentCharity: {
      name: 'Local Food Bank',
      description: 'Help feed families in Brisbane',
      target: 100,
      raised: 0,
      image: '🍎'
    }
  });

  const [completedJobs, setCompletedJobs] = useState({});
  const [charityAllocations, setCharityAllocations] = useState({});

  useEffect(() => {
    // Update theme weekly
    const theme = getWeeklyTheme();
    setCurrentTheme(theme);
    document.body.className = `theme-${theme.name.toLowerCase()}`;
  }, []);

  const handleJobComplete = (childName, jobIndex, completed) => {
    setCompletedJobs(prev => ({
      ...prev,
      [`${childName}-${jobIndex}`]: completed
    }));
  };

  const handleCharityAllocation = (childName, amount) => {
    setCharityAllocations(prev => ({
      ...prev,
      [childName]: amount
    }));
  };

  return (
    <div className={`App theme-${currentTheme.name.toLowerCase()}`}>
      <header className="app-header">
        <h1>🏠 Family Dashboard</h1>
        <div className="theme-indicator">
          <span>{currentTheme.emoji}</span>
          <span>{currentTheme.name} Week!</span>
        </div>
        <div className="date-display">
          {new Date().toLocaleDateString('en-AU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={currentView === 'dashboard' ? 'active' : ''}
          onClick={() => setCurrentView('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={currentView === 'money' ? 'active' : ''}
          onClick={() => setCurrentView('money')}
        >
          💰 Pocket Money
        </button>
        <button 
          className={currentView === 'charity' ? 'active' : ''}
          onClick={() => setCurrentView('charity')}
        >
          ❤️ Charity
        </button>
        <button 
          className={currentView === 'photos' ? 'active' : ''}
          onClick={() => setCurrentView('photos')}
        >
          📸 Photos
        </button>
      </nav>

      <main className="dashboard-content">
        {currentView === 'dashboard' && (
          <div className="dashboard-grid">
            <div className="widget">
              <CalendarEvents />
            </div>
            <div className="widget">
              <TasksList />
            </div>
            <div className="widget">
              <WeeklyReflection />
            </div>
          </div>
        )}

        {currentView === 'money' && (
          <PocketMoneyTracker 
            children={familyData.children}
            completedJobs={completedJobs}
            onJobComplete={handleJobComplete}
          />
        )}

        {currentView === 'charity' && (
          <CharityTracker 
            charity={familyData.currentCharity}
            children={familyData.children}
            allocations={charityAllocations}
            onAllocationChange={handleCharityAllocation}
          />
        )}

        {currentView === 'photos' && (
          <PhotoSlideshow />
        )}
      </main>
    </div>
  );
}

export default App;
