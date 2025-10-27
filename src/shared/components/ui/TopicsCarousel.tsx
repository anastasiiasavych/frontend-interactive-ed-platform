import React, { useState, useEffect } from 'react';
import '../../../assets/styles/TopicsCarousel.css';
const TopicsCarousel = ({ topics }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === topics.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? topics.length - 1 : prevIndex - 1
    );
  };
  const handleDotClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [currentIndex]);
  return (
    <div className="topics-carousel">
      <div className="carousel-container">
        <button 
          className="carousel-button prev" 
          onClick={handlePrev}
          disabled={isAnimating}
          aria-label="Попередня тема"
        >
          ❮
        </button>
        
        <div className="carousel-track">
          {topics.map((topic, index) => {
            const position = index - currentIndex;
            return (
              <div
                key={index}
                className={`carousel-card ${position === 0 ? 'active' : ''}`}
                style={{
                  '--position': position,
                  zIndex: position === 0 ? 2 : 1
                }}
              >
                <div className={`card-content ${topic.color}`}>
                  <div className="topic-icon">{topic.icon}</div>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button 
          className="carousel-button next" 
          onClick={handleNext}
          disabled={isAnimating}
          aria-label="Наступна тема"
        >
          ❯
        </button>
      </div>
      <div className="carousel-dots">
        {topics.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            disabled={isAnimating}
            aria-label={`Перейти до теми ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
export default TopicsCarousel; 