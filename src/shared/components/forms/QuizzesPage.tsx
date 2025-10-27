import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { 
  FiHome, 
  FiBook, 
  FiTrendingUp, 
  FiUser, 
  FiCheck, 
  FiSearch, 
  FiX, 
  FiFilter, 
  FiClock, 
  FiAward, 
  FiArrowRight 
} from 'react-icons/fi';
import '../../styles/QuizzesPage.css';
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
export const QUIZ_SETS = {
  quiz1: {
    name: 'Вікторина з безпеки',
    color: '#2563eb',
    icon: '❓',
    questions: 10,
    time: 8,
    difficulty: 'beginner',
    categories: ['safety']
  },
  quiz2: {
    name: 'Здоров\'я та гігієна',
    color: '#10b981',
    icon: '🧼',
    questions: 12,
    time: 10,
    difficulty: 'intermediate',
    categories: ['health']
  }
};
const QuizCard = ({ quiz, onClick }) => (
  <motion.div className="flashcard-set" onClick={onClick} whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} transition={{ duration: 0.2 }}>
    <div className="flashcard-set-content">
      <div className="flashcard-set-header">
        <div className="flashcard-set-icon" style={{ backgroundColor: `${quiz.color}15` }}>
          <span className="flashcard-set-emoji">{quiz.icon}</span>
        </div>
        <div className="flashcard-set-difficulty">
          <span className={`difficulty-badge ${quiz.difficulty}`}>{DIFFICULTY_LEVELS[quiz.difficulty]}</span>
        </div>
      </div>
      <h3 className="flashcard-set-title">{quiz.name}</h3>
      <div className="flashcard-set-meta">
        <div className="flashcard-set-meta-item"><FiCheck className="meta-icon" />{quiz.questions} питань</div>
        <div className="flashcard-set-meta-item"><FiClock className="meta-icon" />{quiz.time} хв</div>
      </div>
      <div className="flashcard-set-categories">
        {quiz.categories.map((cat, i) => {
          const category = CATEGORIES.find(c => c.id === cat);
          return category ? (<span key={i} className="flashcard-set-category">{category.name}</span>) : null;
        })}
      </div>
    </div>
    <div className="flashcard-set-footer">
      <span>Почати вікторину</span>
      <FiArrowRight className="start-icon" />
    </div>
  </motion.div>
);
QuizCard.propTypes = { quiz: PropTypes.object.isRequired, onClick: PropTypes.func.isRequired };
const QuizzesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('quizzes');
  
  const user = { 
    name: 'Анастасія', 
    email: 'anastasia@email.com', 
    stats: [ 
      { label: 'Вікторин пройдено', value: '3/10' }, 
      { label: 'Прогрес', value: '30%' }, 
      { label: 'Серія', value: '2 дні' } 
    ] 
  };
  
  const stats = [ 
    { label: 'Пройдено вікторин', value: 3 }, 
    { label: 'Серія днів', value: 2 }, 
    { label: 'Точність', value: '80%' } 
  ];
  const filteredQuizzes = Object.entries(QUIZ_SETS).filter(([_, quiz]) => {
    const matchesSearch = quiz.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || quiz.categories.includes(selectedCategory);
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  const handleQuizClick = id => navigate(`/quiz/${id}`);
  const clearFilters = () => { setSelectedCategory('all'); setSelectedDifficulty('all'); setSearchQuery(''); };
  const toggleSidebar = () => setIsSidebarVisible(v => !v);
  return (
    <div className="flashcards-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg,#e0e7ff 0%,#f0f9ff 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: '0 0 80px 0',
    }}>
      {/* Accent gradient blobs */}
      <div style={{position:'absolute',top:-90,left:-110,width:310,height:310,background:'radial-gradient(circle at 40% 40%,#60a5fa88 0%,#fff0 80%)',filter:'blur(20px)',zIndex:0}}/>
      <div style={{position:'absolute',bottom:-120,right:-120,width:340,height:340,background:'radial-gradient(circle at 60% 60%,#2563eb44 0%,#fff0 80%)',filter:'blur(30px)',zIndex:0}}/>
      <div style={{position:'absolute',top:120,right:40,width:120,height:120,background:'radial-gradient(circle,#f59e4288 0%,#fff0 80%)',filter:'blur(18px)',zIndex:0}}/>
      {/* Toggle Button */}
      <button 
        className={`sidebar-toggle ${isSidebarVisible ? 'active' : ''}`}
        onClick={toggleSidebar}
        aria-label={isSidebarVisible ? 'Сховати бічне меню' : 'Показати бічне меню'}
      >
        {isSidebarVisible ? '❮' : '❯'}
      </button>
      {/* Sidebar */}
      <div className={`flashcards-sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
        <div 
          className={`sidebar-icon ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <FiHome size={20} />
        </div>
        <div 
          className={`sidebar-icon ${activeTab === 'quizzes' ? 'active' : ''}`}
          onClick={() => setActiveTab('quizzes')}
        >
          <FiAward size={20} />
        </div>
        <div 
          className={`sidebar-icon ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <FiTrendingUp size={20} />
        </div>
        <div 
          className={`sidebar-icon ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <FiUser size={20} />
        </div>
      </div>
      <div className="flashcards-main-area">
        <div className="flashcards-container">
          <header className="flashcards-header">
            <div className="header-content">
              <h1>Вікторини</h1>
              <p className="header-subtitle">Оберіть вікторину для перевірки своїх знань</p>
            </div>
            <div className="search-filter-container">
              <div className="search-box">
                <FiSearch className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Пошук вікторин..." 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
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
                onClick={() => setShowFilters(v => !v)}
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
                      {CATEGORIES.map(category => (
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
                <button onClick={() => setSelectedCategory('all')}>
                  <FiX />
                </button>
              </span>
            )}
            {selectedDifficulty !== 'all' && (
              <span className="active-filter">
                {DIFFICULTY_LEVELS[selectedDifficulty]}
                <button onClick={() => setSelectedDifficulty('all')}>
                  <FiX />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="active-filter">
                Пошук: {searchQuery}
                <button onClick={() => setSearchQuery('')}>
                  <FiX />
                </button>
              </span>
            )}
            {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
              <button className="clear-all-filters" onClick={clearFilters}>
                Очистити все
              </button>
            )}
          </div>
          
          {filteredQuizzes.length > 0 ? (
            <div className="flashcards-grid">
              <AnimatePresence>
                {filteredQuizzes.map(([id, quiz]) => (
                  <motion.div 
                    key={id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -20 }} 
                    transition={{ duration: 0.3 }}
                  >
                    <QuizCard 
                      quiz={quiz} 
                      onClick={() => handleQuizClick(id)} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="no-cards-message">
              <FiSearch className="no-cards-icon" />
              <h3>Вікторин не знайдено</h3>
              <p>Спробуйте змінити параметри пошуку або фільтри</p>
              <button className="clear-filters-btn" onClick={clearFilters}>
                Скинути фільтри
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="decorative-elements">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`decorative-shape shape-${i}`} />
        ))}
      </div>
    </div>
  );
};
export default QuizzesPage;
