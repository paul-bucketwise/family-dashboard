import React, { useState, useEffect } from 'react';
import './CalendarEvents.css';

const CalendarEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock events for now - will be replaced with Google Calendar API
  const mockEvents = [
    {
      id: '1',
      title: 'Leni\'s Soccer Practice',
      date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
      time: '4:00 PM',
      type: 'sport',
      attendees: ['Leni']
    },
    {
      id: '2',
      title: 'Family Movie Night',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
      time: '7:00 PM',
      type: 'family',
      attendees: ['Everyone']
    },
    {
      id: '3',
      title: 'Ayda\'s Piano Lesson',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      time: '3:30 PM',
      type: 'lesson',
      attendees: ['Ayda']
    },
    {
      id: '4',
      title: 'Finn\'s Playdate',
      date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      time: '10:00 AM',
      type: 'social',
      attendees: ['Finn']
    },
    {
      id: '5',
      title: 'Parent-Teacher Conference',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      time: '2:00 PM',
      type: 'school',
      attendees: ['Parents', 'Leni']
    },
    {
      id: '6',
      title: 'Weekend Beach Trip',
      date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      time: '9:00 AM',
      type: 'family',
      attendees: ['Everyone']
    }
  ];

  useEffect(() => {
    // Simulate loading events from Google Calendar API
    const loadEvents = async () => {
      setLoading(true);
      // In a real implementation, this would call Google Calendar API
      // const events = await fetchGoogleCalendarEvents();
      setTimeout(() => {
        setEvents(mockEvents);
        setLoading(false);
      }, 800);
    };

    loadEvents();
  }, []);

  const getEventIcon = (type) => {
    const icons = {
      sport: '⚽',
      family: '👨‍👩‍👧‍👦',
      lesson: '📚',
      social: '🎈',
      school: '🏫',
      appointment: '🏥',
      birthday: '🎂'
    };
    return icons[type] || '📅';
  };

  const getEventTypeColor = (type) => {
    const colors = {
      sport: '#4CAF50',
      family: '#FF9800',
      lesson: '#2196F3',
      social: '#E91E63',
      school: '#9C27B0',
      appointment: '#F44336',
      birthday: '#FF5722'
    };
    return colors[type] || '#757575';
  };

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-AU', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getDaysUntil = (date) => {
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1) return `In ${diffDays} days`;
    return 'Past';
  };

  if (loading) {
    return (
      <div className="calendar-events loading">
        <h3>📅 Upcoming Events</h3>
        <div className="loading-spinner">Loading calendar...</div>
      </div>
    );
  }

  return (
    <div className="calendar-events">
      <div className="events-header">
        <h3>📅 This Week's Events</h3>
        <div className="events-count">{events.length} events</div>
      </div>

      <div className="events-list">
        {events.length === 0 ? (
          <div className="no-events">
            <p>No upcoming events this week!</p>
            <p>Enjoy your free time! 😊</p>
          </div>
        ) : (
          events.map((event) => (
            <div 
              key={event.id} 
              className="event-card"
              style={{ borderLeftColor: getEventTypeColor(event.type) }}
            >
              <div className="event-icon">
                {getEventIcon(event.type)}
              </div>
              
              <div className="event-details">
                <div className="event-title">{event.title}</div>
                <div className="event-time">
                  <span className="event-date">{formatDate(event.date)}</span>
                  <span className="event-time-slot">{event.time}</span>
                </div>
                <div className="event-attendees">
                  👥 {event.attendees.join(', ')}
                </div>
              </div>

              <div className="event-countdown">
                <div className="countdown-text">
                  {getDaysUntil(event.date)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="calendar-summary">
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-number">
              {events.filter(e => e.attendees.includes('Everyone') || e.type === 'family').length}
            </span>
            <span className="stat-label">Family Events</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {events.filter(e => e.type === 'sport' || e.type === 'lesson').length}
            </span>
            <span className="stat-label">Activities</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {events.filter(e => e.type === 'school').length}
            </span>
            <span className="stat-label">School Events</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarEvents;
