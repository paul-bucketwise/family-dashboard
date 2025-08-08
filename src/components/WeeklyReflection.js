import React, { useState, useEffect } from 'react';
import './WeeklyReflection.css';

const WeeklyReflection = () => {
  const [reflections, setReflections] = useState({
    highlights: [],
    achievements: [],
    challenges: [],
    gratitude: [],
    nextWeekGoals: []
  });
  const [newEntry, setNewEntry] = useState('');
  const [activeCategory, setActiveCategory] = useState('highlights');

  // Mock reflection data
  const mockReflections = {
    highlights: [
      "Leni scored her first goal in soccer! ⚽",
      "Family movie night with homemade popcorn 🍿",
      "Finn learned to ride his bike without training wheels! 🚲",
      "Ayda played her piano piece perfectly at practice 🎹"
    ],
    achievements: [
      "All kids completed their weekly jobs",
      "Donated $15 to the local food bank",
      "Finished the family puzzle together",
      "Everyone helped with Sunday dinner prep"
    ],
    challenges: [
      "Getting everyone ready for school on time",
      "Balancing screen time limits",
      "Organizing the toy room cleanup"
    ],
    gratitude: [
      "Sunny weather for outdoor play",
      "Grandma's surprise visit",
      "Healthy family - no one got sick!",
      "Neighbors helping with the garden"
    ],
    nextWeekGoals: [
      "Try a new family recipe together",
      "Visit the local library",
      "Organize a playdate for Finn",
      "Start planning Ayda's birthday party"
    ]
  };

  useEffect(() => {
    // Load saved reflections or use mock data
    setReflections(mockReflections);
  }, []);

  const addReflection = () => {
    if (newEntry.trim()) {
      setReflections(prev => ({
        ...prev,
        [activeCategory]: [...prev[activeCategory], newEntry.trim()]
      }));
      setNewEntry('');
    }
  };

  const removeReflection = (category, index) => {
    setReflections(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const getCategoryIcon = (category) => {
    const icons = {
      highlights: '⭐',
      achievements: '🏆',
      challenges: '💪',
      gratitude: '🙏',
      nextWeekGoals: '🎯'
    };
    return icons[category];
  };

  const getCategoryTitle = (category) => {
    const titles = {
      highlights: 'Week Highlights',
      achievements: 'Achievements',
      challenges: 'Challenges We Faced',
      gratitude: 'Grateful For',
      nextWeekGoals: 'Next Week Goals'
    };
    return titles[category];
  };

  const categories = Object.keys(reflections);

  return (
    <div className="weekly-reflection">
      <div className="reflection-header">
        <h3>🌟 Weekly Family Reflection</h3>
        <div className="week-date">
          Week of {new Date().toLocaleDateString('en-AU', { 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      </div>

      <div className="reflection-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {getCategoryIcon(category)} {getCategoryTitle(category)}
          </button>
        ))}
      </div>

      <div className="reflection-content">
        <div className="category-section">
          <h4>
            {getCategoryIcon(activeCategory)} {getCategoryTitle(activeCategory)}
          </h4>
          
          <div className="reflection-items">
            {reflections[activeCategory].length === 0 ? (
              <div className="no-items">
                <p>No entries yet for this category.</p>
                <p>Add your first reflection below! 😊</p>
              </div>
            ) : (
              reflections[activeCategory].map((item, index) => (
                <div key={index} className="reflection-item">
                  <span className="item-text">{item}</span>
                  <button
                    className="remove-btn"
                    onClick={() => removeReflection(activeCategory, index)}
                    title="Remove this item"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="add-reflection">
            <div className="input-group">
              <input
                type="text"
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                placeholder={`Add a new ${activeCategory.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                onKeyPress={(e) => e.key === 'Enter' && addReflection()}
              />
              <button onClick={addReflection} className="add-btn">
                ➕ Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="reflection-summary">
        <div className="summary-stats">
          {categories.map(category => (
            <div key={category} className="summary-stat">
              <div className="stat-icon">{getCategoryIcon(category)}</div>
              <div className="stat-number">{reflections[category].length}</div>
              <div className="stat-label">{getCategoryTitle(category)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="reflection-actions">
        <button className="action-btn save">
          💾 Save Reflections
        </button>
        <button className="action-btn share">
          📤 Share with Family
        </button>
        <button className="action-btn print">
          🖨️ Print Summary
        </button>
      </div>
    </div>
  );
};

export default WeeklyReflection;
