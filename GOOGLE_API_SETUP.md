# Google API Integration Setup Guide

## 🎯 Overview
This guide walks through setting up Google APIs for the family dashboard to replace mock data with real family information.

## 📋 What We're Integrating
1. **Google Photos Library API** ✅ - Family photo slideshow (READY TO TEST)
2. **Google Calendar API** 🔄 - Real family events (NEXT)
3. **Google Tasks API** 🔄 - Actual task management (AFTER CALENDAR)

## 🚀 Step 1: Google Cloud Project Setup

### 1.1 Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account (use the same account that has your family photos)
3. Click "New Project" (top left, next to "Google Cloud")
4. Project name: `family-dashboard`
5. Click "Create"
6. Wait for project creation (30 seconds)

### 1.2 Enable Google Photos Library API
1. In your new project, go to "APIs & Services" > "Library" (left sidebar)
2. Search for "Photos Library API"
3. Click on "Photos Library API"
4. Click "Enable" button
5. Wait for activation (30 seconds)

### 1.3 Create API Credentials

#### Create API Key:
1. Go to "APIs & Services" > "Credentials" (left sidebar)
2. Click "Create Credentials" > "API Key"
3. Copy the API key that appears (save it somewhere safe)
4. Click "Close"

#### Create OAuth 2.0 Client ID:
1. Still in "Credentials", click "Create Credentials" > "OAuth 2.0 Client IDs"
2. If prompted to configure OAuth consent screen:
   - Click "Configure Consent Screen"
   - Choose "External" (unless you have Google Workspace)
   - Fill in required fields:
     - App name: "Family Dashboard"
     - User support email: your email
     - Developer contact: your email
   - Click "Save and Continue" through all steps
   - Click "Back to Dashboard"
3. Now create OAuth client:
   - Application type: "Web application"
   - Name: "Family Dashboard"
   - Authorized JavaScript origins: 
     - `http://localhost:3000` (for testing)
     - `https://paul-bucketwise.github.io` (for production)
   - Click "Create"
4. Copy the Client ID (save it somewhere safe)

## 🔐 Step 2: Configure Your Local Environment

### 2.1 Create Environment File
```bash
cd /Users/pauledwards/family-dashboard
cp .env.local.example .env.local
```

### 2.2 Add Your API Keys
Edit `.env.local` and replace the placeholders:
```
REACT_APP_GOOGLE_API_KEY=your_actual_api_key_from_step_1.3
REACT_APP_GOOGLE_CLIENT_ID=your_actual_client_id_from_step_1.3
```

## 🧪 Step 3: Test Google Photos Integration

### 3.1 Start Local Development
```bash
cd /Users/pauledwards/family-dashboard
npm start
```

### 3.2 Test the Integration
1. Open http://localhost:3000
2. Navigate to the "📸 Photos" tab
3. You should see a "Connect Google Photos" button
4. Click it and sign in with your Google account
5. Grant permission to access your photos
6. You should see your real family photos from the past week!

### 3.3 Troubleshooting
- **"API keys not configured"**: Check your `.env.local` file
- **"Authentication failed"**: Verify your Client ID is correct
- **"No photos found"**: Try taking a photo with your phone first
- **"Permission denied"**: Make sure you're using the same Google account

## 📱 Step 4: Deploy with API Keys

### 4.1 GitHub Secrets Setup
1. Go to your GitHub repository: https://github.com/paul-bucketwise/family-dashboard
2. Click "Settings" tab
3. Click "Secrets and variables" > "Actions" (left sidebar)
4. Click "New repository secret"
5. Add these secrets:
   - Name: `REACT_APP_GOOGLE_API_KEY`, Value: your API key
   - Name: `REACT_APP_GOOGLE_CLIENT_ID`, Value: your Client ID

### 4.2 Update Deployment Script
We need to modify the deployment to use GitHub secrets.

### 4.3 Deploy to Production
```bash
npm run deploy
```

## ✅ Current Status: Google Photos Integration

### What's Working:
- ✅ Google Photos API service created
- ✅ Authentication flow implemented
- ✅ Photo fetching from last 7 days
- ✅ Fallback to mock photos if API fails
- ✅ Sign in/out functionality
- ✅ Status indicators in UI

### What to Test:
1. **Local Development**: Follow Step 3 above
2. **Authentication**: Sign in with your Google account
3. **Photo Display**: Verify your real photos appear
4. **Fallback**: Works without API keys (shows demo photos)

## 🔄 Next Steps: Google Calendar Integration

After Google Photos is working, we'll add:
1. Google Calendar API setup
2. Real family events display
3. Event creation capability

## 🔒 Security Notes
- API keys are stored in environment variables (not in code)
- OAuth requires user consent for each access
- Only requests read-only access to photos
- No photos are stored locally (just displayed)

---

**Ready to test?** Follow Step 3 above to see your real family photos in the dashboard!
