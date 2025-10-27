import React from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen, FaRegClock, FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { CATEGORIES } from './CoursesPage';
import { useNavigate } from 'react-router-dom';
import '../../styles/CourseCard.css';
const CourseCard = ({ course, onClick }) => {
  const navigate = useNavigate();
  const getLevelColor = (difficulty) => {
    switch (difficulty) {
      case 'BEGINNER':
        return '#22c55e';
      case 'INTERMEDIATE':
        return '#eab308';
      case 'ADVANCED':
        return '#ef4444';
      case 'EXPERT':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };
  const getDurationText = (hours) => {
    if (hours <= 2) return 'Короткий (1-2 год)';
    if (hours <= 5) return 'Середній (3-5 год)';
    return 'Довгий (6+ год)';
  };
  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'BEGINNER':
        return 'Початковий';
      case 'INTERMEDIATE':
        return 'Середній';
      case 'ADVANCED':
        return 'Просунутий';
      case 'EXPERT':
        return 'Експертний';
      default:
        return difficulty;
    }
  };
  const getCategoryIcon = (categoryId) => {
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.icon : '📚'; // Fallback to book emoji if category not found
  };
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent the card click event from firing
    navigate(`/courses/${course.id}`);
  };
  return (
    <motion.div
      className="course-card"
      whileHover={{ y: -4 }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="course-card-content">
        <div className="course-header">
          <span className="course-emoji">{getCategoryIcon(course.category)}</span>
          {!course.published && (
            <span className="badge draft-badge">Чернетка</span>
          )}
        </div>
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.shortDescription}</p>
        <div className="course-meta">
          <div className="meta-item">
            <FaBookOpen className="meta-icon" />
            <span>{course.modulesCount} модулів</span>
          </div>
          <div className="meta-item">
            <FaRegClock className="meta-icon" />
            <span>{getDurationText(course.durationHours)}</span>
          </div>
          {course.averageRating > 0 && (
            <div className="meta-item">
              <FaStar className="meta-icon" style={{ color: '#eab308' }} />
              <span>{course.averageRating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="course-tags">
          <span className="course-level" style={{ 
            backgroundColor: `${getLevelColor(course.difficulty)}20`,
            color: getLevelColor(course.difficulty)
          }}>
            {getDifficultyText(course.difficulty)}
          </span>
          <span className="course-category">
            {course.category}
          </span>
        </div>
        {course.isEnrolled ? (
          <motion.button 
            className="continue-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleButtonClick}
          >
            Продовжити ({Math.round(course.userProgress)}%)
          </motion.button>
        ) : (
          <motion.button 
            className="start-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleButtonClick}
          >
            Почати навчання
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string,
    difficulty: PropTypes.string.isRequired,
    durationHours: PropTypes.number.isRequired,
    modulesCount: PropTypes.number.isRequired,
    status: PropTypes.string,
    published: PropTypes.bool.isRequired,
    category: PropTypes.string.isRequired,
    averageRating: PropTypes.number,
    isEnrolled: PropTypes.bool.isRequired,
    userProgress: PropTypes.number
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
export default CourseCard;
