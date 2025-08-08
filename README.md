# Family Dashboard

A weekly family dashboard for Brisbane families to manage pocket money, view calendar events, track tasks, and reflect on the week together.

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

## Quick Start

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
