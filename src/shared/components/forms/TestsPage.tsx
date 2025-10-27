import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { 
  FiHome, 
  FiBook, 
  FiTrendingUp, 
  FiUser, 
  FiChevronLeft, 
  FiChevronRight, 
  FiCheck, 
  FiSearch, 
  FiX,
  FiFilter,
  FiClock,
  FiAward,
  FiArrowRight
} from 'react-icons/fi';
import '../../styles/TestsPage.css';
const CATEGORIES = [
  { id: 'all', name: 'Всі категорії' },
  { id: 'safety', name: 'Безпека' },
  { id: 'health', name: 'Здоров\'я' },
  { id: 'firstAid', name: 'Перша допомога' },
  { id: 'cyber', name: 'Кібербезпека' },
];
const DIFFICULTY_LEVELS = {
  beginner: 'Початковий',
  intermediate: 'Середній',
  advanced: 'Просунутий',
  expert: 'Експерт'
};
export const TEST_SETS = {
  firstAid: {
    name: 'Тести з першої допомоги',
    color: '#10b981',
    icon: '🩹',
    questions: 15,
    time: 20,
    difficulty: 'intermediate',
    categories: ['firstAid', 'health']
  },
  fireSafety: {
    name: 'Пожежна безпека',
    color: '#ef4444',
    icon: '🔥',
    questions: 10,
    time: 15,
    difficulty: 'beginner',
    categories: ['safety']
  },
  roadSafety: {
    name: 'Безпека на дорозі',
    color: '#f59e0b',
    icon: '🚸',
    questions: 12,
    time: 18,
    difficulty: 'beginner',
    categories: ['safety']
  },
  cyberSecurity: {
    name: 'Кібербезпека',
    color: '#8b5cf6',
    icon: '🔒',
    questions: 20,
    time: 30,
    difficulty: 'advanced',
    categories: ['cyber']
  },
  emergency: {
    name: 'Надзвичайні ситуації',
    color: '#3b82f6',
    icon: '⚠️',
    questions: 15,
    time: 25,
    difficulty: 'intermediate',
    categories: ['safety']
  },
  healthBasics: {
    name: 'Основи здоров\'я',
    color: '#06b6d4',
    icon: '💊',
    questions: 10,
    time: 15,
    difficulty: 'beginner',
    categories: ['health']
  },
  internetSafety: {
    name: 'Безпека в інтернеті',
    color: '#a855f7',
    icon: '🌐',
    questions: 15,
    time: 20,
    difficulty: 'intermediate',
    categories: ['cyber']
  },
  homeSafety: {
    name: 'Безпека вдома',
    color: '#f97316',
    icon: '🏠',
    questions: 10,
    time: 15,
    difficulty: 'beginner',
    categories: ['safety']
  },
  firstAidAdvanced: {
    name: 'Перша допомога (поглиблено)',
    color: '#10b981',
    icon: '🏥',
    questions: 25,
    time: 35,
    difficulty: 'expert',
    categories: ['firstAid', 'health']
  },
  selfDefense: {
    name: 'Самозахист',
    color: '#ec4899',
    icon: '🥋',
    questions: 12,
    time: 18,
    difficulty: 'intermediate',
    categories: ['safety']
  }
};
const TestCard = ({ test, onClick }) => {
  return (
    <motion.div 
      className="flashcard-set"
      onClick={onClick}
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="flashcard-set-content">
        <div className="flashcard-set-header">
          <div className="flashcard-set-icon" style={{ backgroundColor: `${test.color}15` }}>
            <span className="flashcard-set-emoji">{test.icon}</span>
          </div>
          <div className="flashcard-set-difficulty">
            <span className={`difficulty-badge ${test.difficulty}`}>
              {DIFFICULTY_LEVELS[test.difficulty] || test.difficulty}
            </span>
          </div>
        </div>
        <h3 className="flashcard-set-title">{test.name}</h3>
        <div className="flashcard-set-meta">
          <div className="flashcard-set-meta-item">
            <FiCheckCircle className="meta-icon" />
            <span>{test.questions} питань</span>
          </div>
          <div className="flashcard-set-meta-item">
            <FiClock className="meta-icon" />
            <span>{test.time} хв</span>
          </div>
        </div>
        <div className="flashcard-set-categories">
          {test.categories.map((cat, i) => {
            const category = CATEGORIES.find(c => c.id === cat);
            return category ? (
              <span key={i} className="flashcard-set-category">{category.name}</span>
            ) : null;
          })}
        </div>
      </div>
      <div className="flashcard-set-footer">
        <span>Почати тест</span>
        <FiArrowRight className="start-icon" />
      </div>
    </motion.div>
  );
};
TestCard.propTypes = {
  test: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
const TestsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  const user = {
    name: 'Анастасія',
    email: 'anastasia@email.com',
    stats: [
      { label: 'Тестів пройдено', value: '8/20' },
      { label: 'Прогрес', value: '40%' },
      { label: 'Серія', value: '3 дні' },
    ]
  };
  const filteredTests = Object.entries(TEST_SETS).filter(([_, test]) => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || test.categories.includes(selectedCategory);
    const matchesDifficulty = selectedDifficulty === 'all' || test.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  const handleTestClick = (testId) => {
    navigate(`/quiz/${testId}`);
  };
  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
  };
  
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  
  const stats = [
    { label: 'Пройдено тестів', value: 8 },
    { label: 'Серія днів', value: 3 },
    { label: 'Точність', value: '85%' },
  ];
  return (
    <div className="flashcards-page">
      {/* Sidebar - same as in FlashcardsPage */}
      <div className={`flashcards-sidebar ${!isSidebarVisible ? 'hidden' : ''}`}>
        <div className="sidebar-header">
          <h3>Тести</h3>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`sidebar-nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <FiHome className="nav-icon" />
            <span>Головна</span>
          </button>
          
          <button 
            className={`sidebar-nav-item ${activeTab === 'progress' ? 'active' : ''}`}
            onClick={() => setActiveTab('progress')}
          >
            <FiTrendingUp className="nav-icon" />
            <span>Прогрес</span>
          </button>
          
          <button 
            className={`sidebar-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FiUser className="nav-icon" />
            <span>Профіль</span>
          </button>
        </nav>
        
        <div className="sidebar-stats">
          <h4>Ваша статистика</h4>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <div className="user-name">{user.name}</div>
              <div className="user-email">{user.email}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flashcards-container">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isSidebarVisible ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
        
        <header className="flashcards-header">
          <div className="header-content">
            <h1>Тести та перевірка знань</h1>
            <p className="header-subtitle">Оберіть тест для перевірки своїх знань</p>
          </div>
          
          <div className="search-filter-container">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Пошук тестів..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="clear-search-btn"
                  aria-label="Очистити пошук"
                >
                  <FiX />
                </button>
              )}
            </div>
            
            <button 
              className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter />
              <span>Фільтри</span>
            </button>
          </div>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                className="filters-dropdown"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="filter-section">
                  <h4>Категорія</h4>
                  <div className="filter-options">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        className={`filter-option ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="filter-section">
                  <h4>Рівень складності</h4>
                  <div className="filter-options">
                    <button
                      className={`filter-option ${selectedDifficulty === 'all' ? 'active' : ''}`}
                      onClick={() => setSelectedDifficulty('all')}
                    >
                      Всі
                    </button>
                    {Object.entries(DIFFICULTY_LEVELS).map(([id, name]) => (
                      <button
                        key={id}
                        className={`filter-option ${selectedDifficulty === id ? 'active' : ''}`}
                        onClick={() => setSelectedDifficulty(id)}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="filter-actions">
                  <button className="clear-filters-btn" onClick={clearFilters}>
                    Скинути фільтри
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
        <div className="active-filters">
          {selectedCategory !== 'all' && (
            <span className="active-filter">
              {CATEGORIES.find(c => c.id === selectedCategory)?.name}
              <button onClick={() => setSelectedCategory('all')}><FiX /></button>
            </span>
          )}
          
          {selectedDifficulty !== 'all' && (
            <span className="active-filter">
              {DIFFICULTY_LEVELS[selectedDifficulty]}
              <button onClick={() => setSelectedDifficulty('all')}><FiX /></button>
            </span>
          )}
          
          {searchQuery && (
            <span className="active-filter">
              Пошук: {searchQuery}
              <button onClick={() => setSearchQuery('')}><FiX /></button>
            </span>
          )}
          
          {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
            <button className="clear-all-filters" onClick={clearFilters}>
              Очистити все
            </button>
          )}
        </div>
        {filteredTests.length > 0 ? (
          <div className="flashcards-grid">
            <AnimatePresence>
              {filteredTests.map(([id, test]) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TestCard 
                    test={test} 
                    onClick={() => handleTestClick(id)} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="no-cards-message">
            <FiSearch className="no-cards-icon" />
            <h3>Тестів не знайдено</h3>
            <p>Спробуйте змінити параметри пошуку або фільтри</p>
            <button className="clear-filters-btn" onClick={clearFilters}>
              Скинути фільтри
            </button>
          </div>
        )}
      </div>
      
      {/* Decorative Elements */}
      <div className="decorative-elements">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`decorative-shape shape-${i}`} />
        ))}
      </div>
    </div>
  );
};
export default TestsPage;
