# Family Dashboard

A weekly family dashboard for Brisbane families to manage pocket money, view calendar events, track tasks, and reflect on the week together.

## 👨‍👩‍👧‍👦 Family Context
- **Location**: Brisbane, Australia
- **Family**: Parents + 3 children
- **Children**: Leni (10), Ayda (7), Finn (4)
- **Meeting Schedule**: Sunday evenings, 30 minutes
- **Purpose**: Weekly family planning, pocket money allocation, reflection

## 🎯 Project Goals
- Cast to TV for family meetings
- Interactive pocket money tracking (Barefoot Investor approach)
- Google integration (Calendar, Photos, Tasks)
- Weekly rotating themes to engage kids
- $0 hosting cost (GitHub Pages)

## Features

- **Weekly Themes**: Rotating themes including Harry Potter, Paw Patrol, Bluey, and more
- **Pocket Money Tracker**: Based on Scott Pape's Barefoot Investor for Kids approach
- **Charity Tracker**: Family charity goals with parent matching
- **Photo Slideshow**: Automatic display of family photos from the past week
- **Calendar Integration**: Google Calendar events display
- **Task Management**: Google Tasks integration
- **Weekly Reflection**: Family highlights, achievements, and goals

## Children Setup

- **Leni** (10 years old): $10/week, 3 customizable jobs
- **Ayda** (7 years old): $7/week, 3 customizable jobs  
- **Finn** (4 years old): $4/week, 3 customizable jobs

## 🚀 Development Status

### ✅ Completed Features
- **Pocket Money System**: Barefoot Investor approach with charity/savings/spending allocation
- **Weekly Themes**: 8 rotating themes (Harry Potter, Paw Patrol, Bluey, Space, Ocean, Jungle, Princess, Superhero)
- **Interactive Components**: Real-time job completion tracking, money allocation
- **Charity Tracker**: Parent matching donations, progress visualization
- **Photo Slideshow**: Ready for Google Photos integration (currently mock data)
- **Calendar Events**: Ready for Google Calendar integration (currently mock data)
- **Tasks Management**: Ready for Google Tasks integration (currently mock data)
- **Weekly Reflection**: Family highlights, achievements, goals tracking
- **Responsive Design**: Works on TV, tablet, mobile
- **GitHub Pages Deployment**: $0 forever hosting

### 🔄 Next Phase - Google Integration
1. **Google Photos API**: Automatic family photo slideshow
2. **Google Calendar API**: Real family events display
3. **Google Tasks API**: Actual task management
4. **Data Persistence**: Save family settings and progress

### 🎨 Theme System
Themes automatically rotate weekly based on date:
- Week 1: Harry Potter ⚡ (Dark blue/gold)
- Week 2: Paw Patrol 🐕 (Blue/orange)
- Week 3: Bluey 🐶 (Light blue/yellow)
- Week 4: Space Adventure 🚀 (Dark blue/white)
- Week 5: Ocean Explorer 🌊 (Blue/cyan)
- Week 6: Jungle Safari 🦁 (Green theme)
- Week 7: Princess Castle 👑 (Pink/purple)
- Week 8: Superhero 🦸 (Red/blue)

## 💰 Pocket Money System (Barefoot Investor for Kids)

### Children Setup
- **Leni (10 years)**: $10/week → Jobs worth $2, $2, $6
- **Ayda (7 years)**: $7/week → Jobs worth $2, $2, $3  
- **Finn (4 years)**: $4/week → Jobs worth $1, $1, $2

### Allocation Rules
- Minimum $1 to charity (parents match donations)
- Minimum $1 to savings
- Minimum $1 to spending money
- Kids decide the split during Sunday meetings

### Job Examples
- **Leni**: Feed pets, Tidy room, Help with dishes
- **Ayda**: Make bed, Put toys away, Help set table
- **Finn**: Put shoes away, Help sort washing, Water plants

## 🛠 Technical Architecture

### Frontend
- **React 18**: Modern hooks-based components
- **CSS Themes**: Dynamic theme switching
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: State management for multi-device sync

### Hosting & Deployment
- **GitHub Pages**: Free static hosting
- **GitHub Actions**: Automated deployment via `npm run deploy`
- **Custom Domain Ready**: Can add custom domain later

### File Structure
```
src/
├── components/           # All React components
│   ├── PocketMoneyTracker.js    # Job completion & money allocation
│   ├── CharityTracker.js        # Charity goals & parent matching
│   ├── PhotoSlideshow.js        # Family photos display
│   ├── CalendarEvents.js        # Upcoming events
│   ├── TasksList.js             # Family tasks management
│   └── WeeklyReflection.js      # Family meeting reflection
├── utils/
│   └── themes.js         # Weekly theme rotation logic
└── App.js               # Main dashboard with navigation
```

## 🔗 Live URLs
- **Production**: https://paul-bucketwise.github.io/family-dashboard
- **Repository**: https://github.com/paul-bucketwise/family-dashboard

## 📋 Development Commands

1. **Install dependencies:**
   ```bash
   cd /Users/pauledwards/family-dashboard
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   - Go to `http://localhost:3000`
   - Cast to your TV for family meetings

## Deployment with AWS Amplify

1. **Initialize Amplify:**
   ```bash
   npx @aws-amplify/cli@latest init
   ```

2. **Add hosting:**
   ```bash
   amplify add hosting
   ```

3. **Deploy:**
   ```bash
   amplify publish
   ```

## Google Integration Setup

To connect Google services, you'll need to:

1. Create a Google Cloud Project
2. Enable Google Calendar API
3. Enable Google Tasks API  
4. Enable Google Photos API
5. Create credentials and add them to your environment

## Theme Schedule

Themes rotate automatically each week:
- Week 1: Harry Potter ⚡
- Week 2: Paw Patrol 🐕
- Week 3: Bluey 🐶
- Week 4: Space Adventure 🚀
- Week 5: Ocean Explorer 🌊
- Week 6: Jungle Safari 🦁
- Week 7: Princess Castle 👑
- Week 8: Superhero 🦸

## Family Meeting Structure

**Sunday meetings (30 minutes):**
1. Review last week's photos and achievements
2. Check pocket money job completion
3. Allocate money to charity, savings, and spending
4. Review upcoming calendar events
5. Plan the week ahead
6. Set family goals

## Technology Stack

- **Frontend**: React.js
- **Styling**: CSS with theme support
- **Hosting**: AWS Amplify (Free Tier)
- **APIs**: Google Calendar, Google Tasks, Google Photos
- **Real-time Updates**: WebSocket support for multi-device sync

## Cost

This application is designed to run entirely within AWS Free Tier limits:
- AWS Amplify: Free hosting and CI/CD
- No database costs (using local storage initially)
- Google APIs: Free tier limits sufficient for family use

## Support

For issues or feature requests, please create an issue in the repository.
