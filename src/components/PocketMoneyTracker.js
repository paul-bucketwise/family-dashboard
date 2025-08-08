import React, { useState } from 'react';
import './PocketMoneyTracker.css';

const PocketMoneyTracker = ({ children, completedJobs, onJobComplete }) => {
  const [allocations, setAllocations] = useState({});

  const calculateJobValue = (weeklyAmount) => {
    const baseValue = Math.floor(weeklyAmount / 3);
    const remainder = weeklyAmount % 3;
    return [baseValue, baseValue, baseValue + remainder];
  };

  const getCompletedJobsCount = (childName) => {
    return children.find(child => child.name === childName)?.jobs.filter((_, index) => 
      completedJobs[`${childName}-${index}`]
    ).length || 0;
  };

  const calculateEarnings = (child) => {
    const completedCount = getCompletedJobsCount(child.name);
    const jobValues = calculateJobValue(child.weeklyAmount);
    let totalEarned = 0;
    
    for (let i = 0; i < completedCount; i++) {
      totalEarned += jobValues[i];
    }
    
    return totalEarned;
  };

  const handleAllocationChange = (childName, category, amount) => {
    setAllocations(prev => ({
      ...prev,
      [childName]: {
        ...prev[childName],
        [category]: Math.max(0, amount)
      }
    }));
  };

  const getAllocation = (childName, category) => {
    return allocations[childName]?.[category] || 1; // Minimum $1 for each category
  };

  const getTotalAllocated = (childName) => {
    const child = allocations[childName];
    if (!child) return 3; // Default minimum allocations
    return (child.charity || 1) + (child.savings || 1) + (child.spending || 1);
  };

  return (
    <div className="pocket-money-tracker">
      <h2>💰 Weekly Pocket Money</h2>
      
      <div className="children-grid">
        {children.map((child) => {
          const jobValues = calculateJobValue(child.weeklyAmount);
          const totalEarned = calculateEarnings(child);
          const totalAllocated = getTotalAllocated(child.name);
          const remaining = totalEarned - totalAllocated;
          
          return (
            <div key={child.name} className="child-card">
              <div className="child-header">
                <h3>{child.name} ({child.age} years old)</h3>
                <div className="weekly-amount">Weekly: ${child.weeklyAmount}</div>
              </div>

              <div className="jobs-section">
                <h4>📋 Jobs This Week</h4>
                {child.jobs.map((job, index) => (
                  <div key={index} className="job-item">
                    <label className="job-checkbox">
                      <input
                        type="checkbox"
                        checked={completedJobs[`${child.name}-${index}`] || false}
                        onChange={(e) => onJobComplete(child.name, index, e.target.checked)}
                      />
                      <span className="job-text">{job}</span>
                      <span className="job-value">${jobValues[index]}</span>
                    </label>
                  </div>
                ))}
              </div>

              <div className="earnings-summary">
                <div className="total-earned">
                  <strong>Total Earned: ${totalEarned}</strong>
                </div>
                <div className="completed-jobs">
                  {getCompletedJobsCount(child.name)} of {child.jobs.length} jobs completed
                </div>
              </div>

              <div className="allocation-section">
                <h4>💝 Money Allocation</h4>
                <div className="allocation-grid">
                  <div className="allocation-item">
                    <label>❤️ Charity (min $1):</label>
                    <input
                      type="number"
                      min="1"
                      max={totalEarned}
                      value={getAllocation(child.name, 'charity')}
                      onChange={(e) => handleAllocationChange(child.name, 'charity', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="allocation-item">
                    <label>🏦 Savings (min $1):</label>
                    <input
                      type="number"
                      min="1"
                      max={totalEarned}
                      value={getAllocation(child.name, 'savings')}
                      onChange={(e) => handleAllocationChange(child.name, 'savings', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="allocation-item">
                    <label>🛍️ Spending (min $1):</label>
                    <input
                      type="number"
                      min="1"
                      max={totalEarned}
                      value={getAllocation(child.name, 'spending')}
                      onChange={(e) => handleAllocationChange(child.name, 'spending', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="allocation-summary">
                  <div className={`remaining ${remaining < 0 ? 'over-allocated' : ''}`}>
                    Remaining: ${remaining}
                    {remaining < 0 && <span className="warning"> (Over-allocated!)</span>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PocketMoneyTracker;
