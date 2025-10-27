import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiHome, FiTrendingUp, FiUser, FiChevronLeft, FiChevronRight, FiCheck, FiSearch, FiX, FiFilter, FiClock, FiAward, FiArrowRight } from 'react-icons/fi';
import '../../styles/MatchingPage.css';
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
  advanced: 'Поглиблений',
  expert: 'Експерт'
};
export const MATCHING_SETS = {
  match1: {
    name: 'Відповідність: Перша допомога',
    color: '#f59e0b',
    icon: '🧩',
    questions: 8,
    time: 7,
    difficulty: 'beginner',
    categories: ['firstAid']
  },
  match2: {
    name: 'Кібербезпека: терміни',
    color: '#8b5cf6',
    icon: '🔒',
    questions: 10,
    time: 8,
    difficulty: 'intermediate',
    categories: ['cyber']
  }
};
const MatchingCard = ({ match, onClick }) => (
  <motion.div className="flashcard-set" onClick={onClick} whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} transition={{ duration: 0.2 }}>
    <div className="flashcard-set-content">
      <div className="flashcard-set-header">
        <div className="flashcard-set-icon" style={{ backgroundColor: `${match.color}15` }}>
          <span className="flashcard-set-emoji">{match.icon}</span>
        </div>
        <div className="flashcard-set-difficulty">
          <span className={`difficulty-badge ${match.difficulty}`}>{DIFFICULTY_LEVELS[match.difficulty]}</span>
        </div>
      </div>
      <h3 className="flashcard-set-title">{match.name}</h3>
      <div className="flashcard-set-meta">
        <div className="flashcard-set-meta-item"><FiCheck className="meta-icon" />{match.questions} пар</div>
        <div className="flashcard-set-meta-item"><FiClock className="meta-icon" />{match.time} хв</div>
      </div>
      <div className="flashcard-set-categories">
        {match.categories.map((cat, i) => {
          const category = CATEGORIES.find(c => c.id === cat);
          return category ? (<span key={i} className="flashcard-set-category">{category.name}</span>) : null;
        })}
      </div>
    </div>
    <div className="flashcard-set-footer">
      <span>Почати завдання</span>
      <FiArrowRight className="start-icon" />
    </div>
  </motion.div>
);
MatchingCard.propTypes = { match: PropTypes.object.isRequired, onClick: PropTypes.func.isRequired };
const MatchingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const user = { name: 'Анастасія', email: 'anastasia@email.com', stats: [ { label: 'Завдань виконано', value: '5/12' }, { label: 'Прогрес', value: '42%' }, { label: 'Серія', value: '4 дні' } ] };
  const stats = [ { label: 'Виконано завдань', value: 5 }, { label: 'Серія днів', value: 4 }, { label: 'Точність', value: '87%' } ];
  const filteredMatching = Object.entries(MATCHING_SETS).filter(([_, match]) => {
    const matchesSearch = match.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || match.categories.includes(selectedCategory);
    const matchesDifficulty = selectedDifficulty === 'all' || match.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  const handleMatchClick = id => navigate(`/matching/${id}`);
  const clearFilters = () => { setSelectedCategory('all'); setSelectedDifficulty('all'); setSearchQuery(''); };
  const toggleSidebar = () => setIsSidebarVisible(v => !v);
  return (
    <div className="flashcards-page">
      <div className={`flashcards-sidebar ${!isSidebarVisible ? 'hidden' : ''}`}>
        <div className="sidebar-header"><h3>Завдання на відповідність</h3></div>
        <nav className="sidebar-nav">
          <button className="sidebar-nav-item active"><FiHome className="nav-icon" /><span>Головна</span></button>
          <button className="sidebar-nav-item"><FiTrendingUp className="nav-icon" /><span>Прогрес</span></button>
          <button className="sidebar-nav-item"><FiUser className="nav-icon" /><span>Профіль</span></button>
        </nav>
        <div className="sidebar-stats"><h4>Ваша статистика</h4><div className="stats-grid">{stats.map((stat, i) => (<div key={i} className="stat-item"><div className="stat-value">{stat.value}</div><div className="stat-label">{stat.label}</div></div>))}</div></div>
        <div className="sidebar-footer"><div className="user-info"><div className="user-avatar">{user.name.charAt(0).toUpperCase()}</div><div className="user-details"><div className="user-name">{user.name}</div><div className="user-email">{user.email}</div></div></div></div>
      </div>
      <div className="flashcards-container">
        <button className="sidebar-toggle" onClick={toggleSidebar}>{isSidebarVisible ? <FiChevronLeft /> : <FiChevronRight />}</button>
        <header className="flashcards-header"><div className="header-content"><h1>Завдання на відповідність</h1><p className="header-subtitle">Оберіть завдання для перевірки своїх знань</p></div>
        <div className="search-filter-container"><div className="search-box"><FiSearch className="search-icon" /><input type="text" placeholder="Пошук завдань..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="search-input" />{searchQuery && (<button onClick={() => setSearchQuery('')} className="clear-search-btn" aria-label="Очистити пошук"><FiX /></button>)}</div><button className={`filter-toggle-btn ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(v => !v)}><FiFilter /><span>Фільтри</span></button></div>
        <AnimatePresence>{showFilters && (<motion.div className="filters-dropdown" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}><div className="filter-section"><h4>Категорія</h4><div className="filter-options">{CATEGORIES.map(category => (<button key={category.id} className={`filter-option ${selectedCategory === category.id ? 'active' : ''}`} onClick={() => setSelectedCategory(category.id)}>{category.name}</button>))}</div></div><div className="filter-section"><h4>Рівень складності</h4><div className="filter-options"><button className={`filter-option ${selectedDifficulty === 'all' ? 'active' : ''}`} onClick={() => setSelectedDifficulty('all')}>Всі</button>{Object.entries(DIFFICULTY_LEVELS).map(([id, name]) => (<button key={id} className={`filter-option ${selectedDifficulty === id ? 'active' : ''}`} onClick={() => setSelectedDifficulty(id)}>{name}</button>))}</div></div><div className="filter-actions"><button className="clear-filters-btn" onClick={clearFilters}>Скинути фільтри</button></div></motion.div>)}</AnimatePresence></header>
        <div className="active-filters">{selectedCategory !== 'all' && (<span className="active-filter">{CATEGORIES.find(c => c.id === selectedCategory)?.name}<button onClick={() => setSelectedCategory('all')}><FiX /></button></span>)}{selectedDifficulty !== 'all' && (<span className="active-filter">{DIFFICULTY_LEVELS[selectedDifficulty]}<button onClick={() => setSelectedDifficulty('all')}><FiX /></button></span>)}{searchQuery && (<span className="active-filter">Пошук: {searchQuery}<button onClick={() => setSearchQuery('')}><FiX /></button></span>)}{(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (<button className="clear-all-filters" onClick={clearFilters}>Очистити все</button>)}</div>
        {filteredMatching.length > 0 ? (<div className="flashcards-grid"><AnimatePresence>{filteredMatching.map(([id, match]) => (<motion.div key={id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}><MatchingCard match={match} onClick={() => handleMatchClick(id)} /></motion.div>))}</AnimatePresence></div>) : (<div className="no-cards-message"><FiSearch className="no-cards-icon" /><h3>Завдань не знайдено</h3><p>Спробуйте змінити параметри пошуку або фільтри</p><button className="clear-filters-btn" onClick={clearFilters}>Скинути фільтри</button></div>)}
      </div>
      <div className="decorative-elements">{[...Array(5)].map((_, i) => (<div key={i} className={`decorative-shape shape-${i}`} />))}</div>
    </div>
  );
};
export default MatchingPage;
