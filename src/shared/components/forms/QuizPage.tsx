import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiBook, 
  FiTrendingUp, 
  FiUser, 
  FiChevronLeft, 
  FiChevronRight, 
  FiCheck, 
  FiSearch, 
  FiArrowRight,
  FiFilter,
  FiX,
  FiAlertCircle,
  FiAward,
  FiClock,
  FiPlay,
  FiAlertTriangle,
  FiMenu,
  FiChevronRight as FiChevronRightIcon,
  FiChevronLeft as FiChevronLeftIcon
} from 'react-icons/fi';
import '../../styles/QuizPage.css';
const CATEGORIES = [
  { id: 'all', name: 'Всі категорії' },
  { id: 'fire-safety', name: 'Пожежна безпека' },
  { id: 'water-safety', name: 'Безпека на воді' },
  { id: 'home-safety', name: 'Безпека в побуті' },
  { id: 'firstAid', name: 'Перша допомога' },
  { id: 'cyber', name: 'Кібербезпека' },
];
export const QUIZZES = [
  {
    id: 'firstAid',
    name: 'Перша допомога',
    category: 'firstAid',
    color: '#10b981',
    icon: '🩹',
    description: 'Основні правила надання першої допомоги у різних ситуаціях, які можуть врятувати життя',
    questionsCount: 10,
    difficulty: 'Середній',
    time: 15,
    questions: [
      { question: 'Що робити при опіках?', options: ['Полити холодною водою', 'Намазати олією', 'Проколоти пухирі'], correct: 0 },
      { question: 'Як надати першу допомогу при втраті свідомості?', options: ['Полити водою', 'Перевірити дихання', 'Дати води'], correct: 1 },
    ],
  },
  {
    id: 'fireSafety',
    name: 'Пожежна безпека',
    category: 'safety',
    color: '#ef4444',
    icon: '🔥',
    description: 'Правила поведінки під час пожежі та як запобігти небезпечним ситуаціям',
    questionsCount: 8,
    difficulty: 'Легкий',
    time: 12,
    questions: [
      { question: 'Що робити при пожежі?', options: ['Бігти до виходу', 'Викликати 101', 'Ховатися у шафу'], correct: 1 },
      { question: 'Як правильно користуватися вогнегасником?', options: ['Направити на вогонь', 'Стріляти у стелю', 'Трясти перед використанням'], correct: 0 },
    ],
  },
  {
    id: 'cyberSafety',
    name: 'Кібербезпека',
    category: 'cyber',
    color: '#3b82f6',
    icon: '💻',
    description: 'Як захистити свої дані в інтернеті та уникнути шахрайства',
    questionsCount: 12,
    difficulty: 'Складний',
    time: 20,
    questions: [
      { question: 'Який пароль вважається безпечним?', options: ['123456', 'qwerty', 'J8#kL9$pX2!'], correct: 2 },
      { question: 'Що робити при отриманні підозрілого листа?', options: ['Відкрити вкладень', 'Натиснути на посилання', 'Позначити як спам'], correct: 2 },
    ],
  },
  {
    id: 'roadSafety',
    name: 'Безпека на дорозі',
    category: 'safety',
    color: '#f59e0b',
    icon: '🚸',
    description: 'Правила безпечної поведінки на дорозі',
    questionsCount: 10,
    difficulty: 'Легкий',
    questions: [
      { question: 'Як безпечно переходити дорогу?', options: ['Бігти через дорогу', 'Тільки на зелений світлофор', 'Між припаркованими авто'], correct: 1 },
      { question: 'Чи можна грати біля проїжджої частини?', options: ['Так', 'Ні', 'Якщо нікого немає'], correct: 1 },
    ],
  },
];
const adjustColor = (color, amount) => {
  return '#' + color.replace(/^#/, '').replace(/../g, 
    color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
  );
};
const QuizCard = ({ quiz, onStart }) => {
  const getDifficultyInfo = (difficulty) => {
    const difficultyMap = {
      'легкий': { class: 'beginner', color: '#10b981' },
      'середній': { class: 'intermediate', color: '#3b82f6' },
      'складний': { class: 'advanced', color: '#ef4444' }
    };
    return difficultyMap[difficulty.toLowerCase()] || { class: 'beginner', color: '#6b7280' };
  };
  const difficulty = getDifficultyInfo(quiz.difficulty);
  
  return (
    <motion.div
      className="quiz-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4 }}
    >
      <div className="quiz-card-header">
        <div 
          className="quiz-card-icon"
          style={{ 
            background: `linear-gradient(135deg, ${quiz.color}, ${adjustColor(quiz.color, -20)})`
          }}
        >
          {quiz.icon}
        </div>
        <div className="quiz-card-title-wrapper">
          <h3 className="quiz-card-title">{quiz.name}</h3>
          <span className="quiz-card-category">{quiz.category}</span>
        </div>
      </div>
      
      <div className="quiz-card-body">
        <p className="quiz-card-description">{quiz.description}</p>
        
        <div className="quiz-card-meta">
          <div className="meta-item">
            <FiClock />
            <span>{quiz.time} хв</span>
          </div>
          <div className="meta-item">
            <FiAward />
            <span>{quiz.questionsCount} запитань</span>
          </div>
        </div>
        
        <div className="quiz-card-footer">
          <span className={`quiz-card-difficulty difficulty-${difficulty.class}`}>
            {quiz.difficulty}
          </span>
          <button 
            className="start-quiz-button"
            onClick={(e) => {
              e.stopPropagation();
              onStart(quiz.id);
            }}
            style={{
              background: `linear-gradient(135deg, ${quiz.color}, ${adjustColor(quiz.color, -15)})`
            }}
          >
            Почати
            <FiArrowRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
const QuizPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredQuizzes, setFilteredQuizzes] = useState(QUIZZES);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  const activeTab = location.pathname.split('/')[1] || 'home';
  useEffect(() => {
    let filtered = [...QUIZZES];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(quiz => 
        quiz.name.toLowerCase().includes(term) || 
        quiz.description.toLowerCase().includes(term)
      );
    }
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(quiz => quiz.category === activeCategory);
    }
    
    setFilteredQuizzes(filtered);
  }, [searchTerm, activeCategory]);
  const startQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };
  const clearFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
  };
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="quiz-page-container">
      {/* Background Gradient */}
      <div className="page-background"></div>
      
      {/* Sidebar Toggle Button */}
      <button 
        className={`sidebar-toggle ${isSidebarVisible ? 'active' : ''}`}
        onClick={toggleSidebar}
        aria-label={isSidebarVisible ? 'Сховати бічне меню' : 'Показати бічне меню'}
      >
        {isSidebarVisible ? '❮' : '❯'}
      </button>
      {/* Sidebar Navigation */}
      <div className={`flashcards-sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
        <button 
          className={`sidebar-icon ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
          aria-label="Головна"
        >
          <FiHome size={20} />
        </button>
        <button 
          className={`sidebar-icon ${activeTab === 'flashcards' ? 'active' : ''}`}
          onClick={() => navigate('/flashcards')}
          aria-label="Флеш-картки"
        >
          <FiBook size={20} />
        </button>
        <button 
          className={`sidebar-icon ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => navigate('/quiz')}
          aria-label="Вікторини"
        >
          <FiTrendingUp size={20} />
        </button>
        <button 
          className={`sidebar-icon ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
          aria-label="Профіль"
        >
          <FiUser size={20} />
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flashcards-main-area">
        <div className="flashcards-container">
          {/* Header */}
          <header className="flashcards-header">
            <div className="header-content">
              <motion.h1 
                className="header-title"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              >
                <span>Вікторини</span>
              </motion.h1>
            </div>
          </header>
          {/* Search and Filters */}
          <div className="search-filter-container">
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Знайти вікторину..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Пошук вікторин"
              />
              {(searchTerm || activeCategory !== 'all') && (
                <button 
                  className="clear-filters-button"
                  onClick={clearFilters}
                  aria-label="Очистити фільтри"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
            
            <div className="category-filters">
              {CATEGORIES.map(category => (
                <motion.button
                  key={category.id}
                  className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeCategory === category.id && <FiCheck size={16} style={{ marginRight: 6 }} />}
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
          {/* Quiz Cards Grid */}
          <div className="flashcard-sets">
            <AnimatePresence>
              {filteredQuizzes.length > 0 ? (
                filteredQuizzes.map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <QuizCard 
                      quiz={quiz}
                      onStart={startQuiz}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="no-cards-message"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <FiAlertCircle size={48} className="mb-6 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Нічого не знайдено</h3>
                  <p className="text-gray-600 mb-4">Спробуйте змінити параметри пошуку</p>
                  <button 
                    className="clear-filters-button"
                    onClick={clearFilters}
                  >
                    <FiX size={16} className="mr-2" /> Очистити фільтри
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuizPage;
