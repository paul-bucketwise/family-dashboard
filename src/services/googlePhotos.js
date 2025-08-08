// Google Photos API Service
class GooglePhotosService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    this.clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    this.isInitialized = false;
    this.accessToken = null;
  }

  // Initialize Google API
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Load Google API script
      await this.loadGoogleAPI();
      
      // Initialize the API
      await window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: this.clientId,
          scope: 'https://www.googleapis.com/auth/photoslibrary.readonly'
        });
      });

      this.isInitialized = true;
      console.log('Google Photos API initialized');
    } catch (error) {
      console.error('Failed to initialize Google Photos API:', error);
      throw error;
    }
  }

  // Load Google API script dynamically
  loadGoogleAPI() {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Authenticate user
  async authenticate() {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      const user = await authInstance.signIn();
      this.accessToken = user.getAuthResponse().access_token;
      console.log('User authenticated successfully');
      return true;
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  }

  // Check if user is signed in
  isSignedIn() {
    if (!this.isInitialized) return false;
    const authInstance = window.gapi.auth2.getAuthInstance();
    return authInstance && authInstance.isSignedIn.get();
  }

  // Get recent family photos
  async getRecentPhotos(daysBack = 7, maxResults = 10) {
    if (!this.accessToken) {
      const authenticated = await this.authenticate();
      if (!authenticated) {
        throw new Error('Authentication required');
      }
    }

    try {
      // Calculate date range (last week)
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysBack);

      // Format dates for Google Photos API
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      // Search for photos in date range
      const response = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems:search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filters: {
            dateFilter: {
              ranges: [{
                startDate: {
                  year: startDate.getFullYear(),
                  month: startDate.getMonth() + 1,
                  day: startDate.getDate()
                },
                endDate: {
                  year: endDate.getFullYear(),
                  month: endDate.getMonth() + 1,
                  day: endDate.getDate()
                }
              }]
            },
            mediaTypeFilter: {
              mediaTypes: ['PHOTO']
            }
          },
          pageSize: maxResults
        })
      });

      if (!response.ok) {
        throw new Error(`Google Photos API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform API response to our format
      const photos = (data.mediaItems || []).map(item => ({
        id: item.id,
        url: `${item.baseUrl}=w800-h600`,
        caption: item.description || `Photo from ${new Date(item.mediaMetadata.creationTime).toLocaleDateString('en-AU')}`,
        date: item.mediaMetadata.creationTime,
        filename: item.filename
      }));

      console.log(`Retrieved ${photos.length} photos from Google Photos`);
      return photos;

    } catch (error) {
      console.error('Failed to fetch photos:', error);
      // Return mock data as fallback
      return this.getMockPhotos();
    }
  }

  // Fallback mock photos (same as before)
  getMockPhotos() {
    return [
      {
        id: '1',
        url: 'https://via.placeholder.com/800x600/4a90e2/ffffff?text=Family+Photo+1',
        caption: 'Family fun at the park',
        date: new Date().toISOString()
      },
      {
        id: '2',
        url: 'https://via.placeholder.com/800x600/f5a623/ffffff?text=Family+Photo+2',
        caption: 'Cooking together',
        date: new Date().toISOString()
      },
      {
        id: '3',
        url: 'https://via.placeholder.com/800x600/7ed321/ffffff?text=Family+Photo+3',
        caption: 'Beach day adventure',
        date: new Date().toISOString()
      },
      {
        id: '4',
        url: 'https://via.placeholder.com/800x600/bd10e0/ffffff?text=Family+Photo+4',
        caption: 'Movie night',
        date: new Date().toISOString()
      },
      {
        id: '5',
        url: 'https://via.placeholder.com/800x600/f8e71c/ffffff?text=Family+Photo+5',
        caption: 'Garden adventures',
        date: new Date().toISOString()
      }
    ];
  }

  // Sign out user
  async signOut() {
    if (this.isInitialized) {
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signOut();
      this.accessToken = null;
      console.log('User signed out');
    }
  }
}

// Export singleton instance
export default new GooglePhotosService();
