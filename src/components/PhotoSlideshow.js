import React, { useState, useEffect } from 'react';
import './PhotoSlideshow.css';

const PhotoSlideshow = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock photos for now - will be replaced with Google Photos API
  const mockPhotos = [
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
    },
    {
      id: '6',
      url: 'https://via.placeholder.com/800x600/50e3c2/ffffff?text=Family+Photo+6',
      caption: 'Birthday celebration',
      date: new Date().toISOString()
    },
    {
      id: '7',
      url: 'https://via.placeholder.com/800x600/ff6b6b/ffffff?text=Family+Photo+7',
      caption: 'Arts and crafts time',
      date: new Date().toISOString()
    },
    {
      id: '8',
      url: 'https://via.placeholder.com/800x600/4ecdc4/ffffff?text=Family+Photo+8',
      caption: 'Weekend breakfast',
      date: new Date().toISOString()
    },
    {
      id: '9',
      url: 'https://via.placeholder.com/800x600/45b7d1/ffffff?text=Family+Photo+9',
      caption: 'Playing in the backyard',
      date: new Date().toISOString()
    },
    {
      id: '10',
      url: 'https://via.placeholder.com/800x600/f39c12/ffffff?text=Family+Photo+10',
      caption: 'Story time before bed',
      date: new Date().toISOString()
    }
  ];

  useEffect(() => {
    // Simulate loading photos from Google Photos API
    const loadPhotos = async () => {
      setLoading(true);
      // In a real implementation, this would call Google Photos API
      // const photos = await fetchGooglePhotos();
      setTimeout(() => {
        setPhotos(mockPhotos);
        setLoading(false);
      }, 1000);
    };

    loadPhotos();
  }, []);

  useEffect(() => {
    // Auto-advance slideshow every 5 seconds
    if (photos.length > 0) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prevIndex) => 
          (prevIndex + 1) % photos.length
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [photos.length]);

  const goToNext = () => {
    setCurrentPhotoIndex((prevIndex) => 
      (prevIndex + 1) % photos.length
    );
  };

  const goToPrevious = () => {
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToPhoto = (index) => {
    setCurrentPhotoIndex(index);
  };

  if (loading) {
    return (
      <div className="photo-slideshow loading">
        <div className="loading-spinner">📸 Loading family photos...</div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="photo-slideshow empty">
        <div className="empty-message">
          <h3>📸 No photos from this week yet!</h3>
          <p>Take some family photos and they'll appear here automatically.</p>
        </div>
      </div>
    );
  }

  const currentPhoto = photos[currentPhotoIndex];

  return (
    <div className="photo-slideshow">
      <div className="slideshow-header">
        <h2>📸 This Week's Family Memories</h2>
        <div className="photo-counter">
          {currentPhotoIndex + 1} of {photos.length}
        </div>
      </div>

      <div className="slideshow-container">
        <button className="nav-button prev" onClick={goToPrevious}>
          ‹
        </button>

        <div className="photo-display">
          <img 
            src={currentPhoto.url} 
            alt={currentPhoto.caption}
            className="main-photo"
          />
          <div className="photo-caption">
            <p>{currentPhoto.caption}</p>
            <span className="photo-date">
              {new Date(currentPhoto.date).toLocaleDateString('en-AU')}
            </span>
          </div>
        </div>

        <button className="nav-button next" onClick={goToNext}>
          ›
        </button>
      </div>

      <div className="thumbnail-strip">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            className={`thumbnail ${index === currentPhotoIndex ? 'active' : ''}`}
            onClick={() => goToPhoto(index)}
          >
            <img src={photo.url} alt={photo.caption} />
          </button>
        ))}
      </div>

      <div className="slideshow-controls">
        <button onClick={goToPrevious} className="control-btn">
          ⏮️ Previous
        </button>
        <button onClick={goToNext} className="control-btn">
          ⏭️ Next
        </button>
        <div className="auto-play-indicator">
          ▶️ Auto-playing every 5 seconds
        </div>
      </div>
    </div>
  );
};

export default PhotoSlideshow;
