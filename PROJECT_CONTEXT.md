# Family Dashboard - AI Assistant Context

## 🤖 For AI Assistants Continuing This Project

This file provides essential context for any AI assistant helping to continue development of this family dashboard.

### Project Summary
- **Type**: React.js family dashboard web application
- **Purpose**: Weekly family meetings for Brisbane family with 3 children
- **Status**: Phase 1 complete (fully functional with mock data)
- **Deployment**: Live on GitHub Pages at https://paul-bucketwise.github.io/family-dashboard

### Family Context (IMPORTANT)
- **Location**: Brisbane, Australia
- **Family**: Parents + Leni (10), Ayda (7), Finn (4)
- **Meeting**: Sunday evenings, 30 minutes, cast to TV
- **Methodology**: Scott Pape's Barefoot Investor for Kids approach
- **Budget Constraint**: Must remain $0 hosting cost

### Current Architecture
```
React App (Static) → GitHub Pages → TV Casting
├── 6 Main Components (all functional)
├── 8 Weekly Rotating Themes
├── Mock Data (ready for API replacement)
└── Responsive Design (TV/tablet/mobile)
```

### Key Implementation Details

#### Pocket Money System
- **Leni**: $10/week (jobs: $2, $2, $6)
- **Ayda**: $7/week (jobs: $2, $2, $3)
- **Finn**: $4/week (jobs: $1, $1, $2)
- **Rules**: Min $1 each to charity/savings/spending
- **Special**: Parents match all charity donations

#### Theme Rotation (Automatic)
Themes change weekly based on `Math.floor(diff / oneWeek) % themes.length`:
1. Harry Potter ⚡ (dark blue/gold)
2. Paw Patrol 🐕 (blue/orange)  
3. Bluey 🐶 (light blue/yellow)
4. Space Adventure 🚀 (dark blue/white)
5. Ocean Explorer 🌊 (blue/cyan)
6. Jungle Safari 🦁 (green)
7. Princess Castle 👑 (pink/purple)
8. Superhero 🦸 (red/blue)

### Development Commands
```bash
# Local development
npm start                 # http://localhost:3000

# Deployment  
npm run deploy           # Deploys to GitHub Pages

# Project location
cd /Users/pauledwards/family-dashboard
```

### Next Phase Priorities
1. **Google Photos API**: Replace mock slideshow with real family photos
2. **Google Calendar API**: Show actual family events
3. **Google Tasks API**: Real task management
4. **Data Persistence**: Save settings and progress

### Component Architecture
- `App.js`: Main dashboard with theme system and navigation
- `PocketMoneyTracker.js`: Job completion and money allocation
- `CharityTracker.js`: Charity goals with parent matching
- `PhotoSlideshow.js`: Family photos (ready for Google Photos API)
- `CalendarEvents.js`: Events display (ready for Google Calendar API)
- `TasksList.js`: Task management (ready for Google Tasks API)
- `WeeklyReflection.js`: Family meeting reflection tool

### Critical Constraints
- **Cost**: Must stay $0 (GitHub Pages only)
- **Simplicity**: 30-minute family meetings, kids aged 4-10
- **Reliability**: Used weekly, must always work
- **Privacy**: Family data, security important for API integration

### Files to Reference
- `DEVELOPMENT_LOG.md`: Complete development history
- `README.md`: Current status and setup instructions
- `src/utils/themes.js`: Theme system implementation
- `package.json`: Deployment configuration

### Common Tasks
- **Adding new themes**: Update `src/utils/themes.js`
- **Modifying pocket money**: Update children array in `App.js`
- **API integration**: Replace mock data in respective components
- **Styling changes**: Each component has its own CSS file

### Testing Approach
- Test locally first: `npm start`
- Verify all themes work correctly
- Check responsive design on different screen sizes
- Test TV casting compatibility
- Deploy only after local testing: `npm run deploy`

This context ensures continuity across AI assistant sessions and provides all necessary information to continue development effectively.
