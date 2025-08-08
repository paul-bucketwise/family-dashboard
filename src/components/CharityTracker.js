import React, { useState } from 'react';
import './CharityTracker.css';

const CharityTracker = ({ charity, children, allocations, onAllocationChange }) => {
  const [editMode, setEditMode] = useState(false);
  const [newCharity, setNewCharity] = useState({
    name: charity.name,
    description: charity.description,
    target: charity.target,
    image: charity.image
  });

  const totalAllocated = Object.values(allocations).reduce((sum, amount) => sum + (amount || 0), 0);
  const totalWithMatching = totalAllocated * 2; // Parents match donations
  const progressPercentage = Math.min((charity.raised + totalWithMatching) / charity.target * 100, 100);

  const handleSaveCharity = () => {
    // In a real app, this would update the charity in the database
    setEditMode(false);
  };

  const handleCompleteGoal = () => {
    // In a real app, this would mark the charity as complete and reset for a new one
    alert(`Congratulations! You've reached the goal for ${charity.name}! 🎉`);
  };

  return (
    <div className="charity-tracker">
      <h2>❤️ Our Family Charity</h2>
      
      <div className="charity-card">
        {editMode ? (
          <div className="charity-edit">
            <div className="edit-field">
              <label>Charity Name:</label>
              <input
                type="text"
                value={newCharity.name}
                onChange={(e) => setNewCharity({...newCharity, name: e.target.value})}
              />
            </div>
            <div className="edit-field">
              <label>Description:</label>
              <input
                type="text"
                value={newCharity.description}
                onChange={(e) => setNewCharity({...newCharity, description: e.target.value})}
              />
            </div>
            <div className="edit-field">
              <label>Target Amount ($):</label>
              <input
                type="number"
                value={newCharity.target}
                onChange={(e) => setNewCharity({...newCharity, target: parseInt(e.target.value)})}
              />
            </div>
            <div className="edit-field">
              <label>Emoji/Image:</label>
              <input
                type="text"
                value={newCharity.image}
                onChange={(e) => setNewCharity({...newCharity, image: e.target.value})}
              />
            </div>
            <div className="edit-buttons">
              <button onClick={handleSaveCharity} className="save-btn">Save</button>
              <button onClick={() => setEditMode(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="charity-display">
            <div className="charity-header">
              <div className="charity-image">{charity.image}</div>
              <div className="charity-info">
                <h3>{charity.name}</h3>
                <p>{charity.description}</p>
              </div>
              <button onClick={() => setEditMode(true)} className="edit-btn">✏️ Edit</button>
            </div>

            <div className="progress-section">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="progress-text">
                <span>${charity.raised + totalWithMatching} of ${charity.target}</span>
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
            </div>

            {progressPercentage >= 100 && (
              <div className="goal-complete">
                <h4>🎉 Goal Reached!</h4>
                <button onClick={handleCompleteGoal} className="complete-btn">
                  Complete Donation & Set New Goal
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="weekly-donations">
        <h3>💝 This Week's Donations</h3>
        <div className="donations-grid">
          {children.map((child) => {
            const childAllocation = allocations[child.name] || 0;
            const matchedAmount = childAllocation;
            
            return (
              <div key={child.name} className="donation-card">
                <div className="child-name">{child.name}</div>
                <div className="donation-amount">
                  <div className="child-donation">
                    Child: ${childAllocation}
                  </div>
                  <div className="parent-match">
                    Parents Match: ${matchedAmount}
                  </div>
                  <div className="total-donation">
                    <strong>Total: ${childAllocation + matchedAmount}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="weekly-summary">
          <div className="summary-item">
            <span>Children's Total:</span>
            <span>${totalAllocated}</span>
          </div>
          <div className="summary-item">
            <span>Parents' Match:</span>
            <span>${totalAllocated}</span>
          </div>
          <div className="summary-item total">
            <span><strong>Weekly Total:</strong></span>
            <span><strong>${totalWithMatching}</strong></span>
          </div>
        </div>
      </div>

      <div className="charity-impact">
        <h3>🌟 Our Impact</h3>
        <div className="impact-stats">
          <div className="stat">
            <div className="stat-number">${charity.raised}</div>
            <div className="stat-label">Previously Donated</div>
          </div>
          <div className="stat">
            <div className="stat-number">${totalWithMatching}</div>
            <div className="stat-label">This Week</div>
          </div>
          <div className="stat">
            <div className="stat-number">${charity.raised + totalWithMatching}</div>
            <div className="stat-label">Total Impact</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityTracker;
