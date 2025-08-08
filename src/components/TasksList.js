import React, { useState, useEffect } from 'react';
import './TasksList.css';

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock tasks for now - will be replaced with Google Tasks API
  const mockTasks = [
    {
      id: '1',
      title: 'Buy groceries for the week',
      completed: false,
      priority: 'high',
      assignee: 'Parents',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      category: 'household'
    },
    {
      id: '2',
      title: 'Book dentist appointments for kids',
      completed: false,
      priority: 'medium',
      assignee: 'Parents',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      category: 'health'
    },
    {
      id: '3',
      title: 'Leni - Finish science project',
      completed: false,
      priority: 'high',
      assignee: 'Leni',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      category: 'school'
    },
    {
      id: '4',
      title: 'Plan weekend family activity',
      completed: true,
      priority: 'low',
      assignee: 'Family',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      category: 'family'
    },
    {
      id: '5',
      title: 'Ayda - Practice piano pieces',
      completed: false,
      priority: 'medium',
      assignee: 'Ayda',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      category: 'practice'
    },
    {
      id: '6',
      title: 'Organize kids\' toy room',
      completed: false,
      priority: 'low',
      assignee: 'Family',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      category: 'household'
    },
    {
      id: '7',
      title: 'Finn - Learn to tie shoelaces',
      completed: false,
      priority: 'low',
      assignee: 'Finn',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      category: 'learning'
    }
  ];

  useEffect(() => {
    // Simulate loading tasks from Google Tasks API
    const loadTasks = async () => {
      setLoading(true);
      // In a real implementation, this would call Google Tasks API
      // const tasks = await fetchGoogleTasks();
      setTimeout(() => {
        setTasks(mockTasks);
        setLoading(false);
      }, 600);
    };

    loadTasks();
  }, []);

  const toggleTaskComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      high: '🔴',
      medium: '🟡',
      low: '🟢'
    };
    return icons[priority] || '⚪';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      household: '🏠',
      health: '🏥',
      school: '📚',
      family: '👨‍👩‍👧‍👦',
      practice: '🎵',
      learning: '🧠'
    };
    return icons[category] || '📋';
  };

  const formatDueDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Due Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Due Tomorrow';
    } else if (date < today) {
      return 'Overdue';
    } else {
      return `Due ${date.toLocaleDateString('en-AU', { 
        month: 'short', 
        day: 'numeric' 
      })}`;
    }
  };

  const getDueDateClass = (date, completed) => {
    if (completed) return 'completed';
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date < today) return 'overdue';
    if (date.toDateString() === today.toDateString()) return 'due-today';
    if (date.toDateString() === tomorrow.toDateString()) return 'due-tomorrow';
    return 'future';
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  const overdueTasks = pendingTasks.filter(task => task.dueDate < new Date());

  if (loading) {
    return (
      <div className="tasks-list loading">
        <h3>✅ Family Tasks</h3>
        <div className="loading-spinner">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="tasks-list">
      <div className="tasks-header">
        <h3>✅ This Week's Tasks</h3>
        <div className="tasks-summary">
          <span className="completed-count">{completedTasks.length} completed</span>
          <span className="pending-count">{pendingTasks.length} pending</span>
          {overdueTasks.length > 0 && (
            <span className="overdue-count">{overdueTasks.length} overdue</span>
          )}
        </div>
      </div>

      <div className="tasks-container">
        {/* Pending Tasks */}
        <div className="tasks-section">
          <h4>📋 To Do ({pendingTasks.length})</h4>
          {pendingTasks.length === 0 ? (
            <div className="no-tasks">
              <p>🎉 All tasks completed!</p>
            </div>
          ) : (
            <div className="tasks-grid">
              {pendingTasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`task-card ${getDueDateClass(task.dueDate, task.completed)}`}
                >
                  <div className="task-header">
                    <button
                      className="task-checkbox"
                      onClick={() => toggleTaskComplete(task.id)}
                    >
                      <span className="checkbox">☐</span>
                    </button>
                    <div className="task-priority">
                      {getPriorityIcon(task.priority)}
                    </div>
                  </div>

                  <div className="task-content">
                    <div className="task-title">{task.title}</div>
                    <div className="task-meta">
                      <span className="task-assignee">
                        👤 {task.assignee}
                      </span>
                      <span className="task-category">
                        {getCategoryIcon(task.category)}
                      </span>
                    </div>
                    <div className={`task-due-date ${getDueDateClass(task.dueDate, task.completed)}`}>
                      {formatDueDate(task.dueDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div className="tasks-section completed-section">
            <h4>✅ Completed ({completedTasks.length})</h4>
            <div className="tasks-grid">
              {completedTasks.map((task) => (
                <div key={task.id} className="task-card completed">
                  <div className="task-header">
                    <button
                      className="task-checkbox"
                      onClick={() => toggleTaskComplete(task.id)}
                    >
                      <span className="checkbox">☑️</span>
                    </button>
                  </div>

                  <div className="task-content">
                    <div className="task-title">{task.title}</div>
                    <div className="task-meta">
                      <span className="task-assignee">
                        👤 {task.assignee}
                      </span>
                      <span className="task-category">
                        {getCategoryIcon(task.category)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="tasks-stats">
        <div className="stat">
          <span className="stat-number">{Math.round((completedTasks.length / tasks.length) * 100)}%</span>
          <span className="stat-label">Complete</span>
        </div>
        <div className="stat">
          <span className="stat-number">{overdueTasks.length}</span>
          <span className="stat-label">Overdue</span>
        </div>
        <div className="stat">
          <span className="stat-number">{tasks.filter(t => t.priority === 'high' && !t.completed).length}</span>
          <span className="stat-label">High Priority</span>
        </div>
      </div>
    </div>
  );
};

export default TasksList;
