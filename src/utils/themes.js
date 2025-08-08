// Weekly rotating themes for the family dashboard
const themes = [
  {
    name: 'Harry Potter',
    emoji: '⚡',
    colors: {
      primary: '#740001',
      secondary: '#D3A625',
      background: '#0E1A40',
      text: '#FFFFFF'
    },
    font: 'serif'
  },
  {
    name: 'Paw Patrol',
    emoji: '🐕',
    colors: {
      primary: '#003f7f',
      secondary: '#ff6b35',
      background: '#87ceeb',
      text: '#000080'
    },
    font: 'sans-serif'
  },
  {
    name: 'Bluey',
    emoji: '🐶',
    colors: {
      primary: '#4a90e2',
      secondary: '#f5a623',
      background: '#e8f4fd',
      text: '#2c3e50'
    },
    font: 'sans-serif'
  },
  {
    name: 'Space Adventure',
    emoji: '🚀',
    colors: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      background: '#0f3460',
      text: '#ffffff'
    },
    font: 'monospace'
  },
  {
    name: 'Ocean Explorer',
    emoji: '🌊',
    colors: {
      primary: '#006994',
      secondary: '#47b5ff',
      background: '#dff6ff',
      text: '#003d5b'
    },
    font: 'sans-serif'
  },
  {
    name: 'Jungle Safari',
    emoji: '🦁',
    colors: {
      primary: '#2d5016',
      secondary: '#8fbc8f',
      background: '#f0fff0',
      text: '#2d5016'
    },
    font: 'sans-serif'
  },
  {
    name: 'Princess Castle',
    emoji: '👑',
    colors: {
      primary: '#ff69b4',
      secondary: '#dda0dd',
      background: '#fff0f5',
      text: '#8b008b'
    },
    font: 'serif'
  },
  {
    name: 'Superhero',
    emoji: '🦸',
    colors: {
      primary: '#dc143c',
      secondary: '#4169e1',
      background: '#f0f8ff',
      text: '#000080'
    },
    font: 'sans-serif'
  }
];

export const getWeeklyTheme = () => {
  // Get current week number to rotate themes
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const weekNumber = Math.floor(diff / oneWeek);
  
  return themes[weekNumber % themes.length];
};

export const getAllThemes = () => themes;
