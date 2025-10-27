import React, { useState } from 'react';
import { FaStar, FaFilter, FaSearch, FaTrophy, FaClock, FaUsers } from 'react-icons/fa';
import '../../styles/Quizzes.css';
const Quizzes = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const quizzes = [
    {
      id: 1,
      title: 'Безпека в соціальних мережах',
      description: 'Захоплююча вікторина про правила безпечного спілкування онлайн',
      difficulty: 'beginner',
      topic: 'social',
      playersCount: 1250,
      timeMinutes: 10,
      maxScore: 100
    },
    {
      id: 2,
      title: 'Кіберзагрози та захист',
      description: 'Перевір свої знання про сучасні методи кіберзахисту',
      difficulty: 'advanced',
      topic: 'cybersecurity',
      playersCount: 850,
      timeMinutes: 15,
      maxScore: 150
    },
    {
      id: 3,
      title: 'Безпечний інтернет-серфінг',
      description: 'Вікторина про безпечне використання веб-браузерів та онлайн-сервісів',
      difficulty: 'intermediate',
      topic: 'internet',
      playersCount: 980,
      timeMinutes: 12,
      maxScore: 120
    }
  ];
  const topics = [
    { id: 'all', name: 'Всі теми' },
    { id: 'social', name: 'Соціальні мережі' },
    { id: 'cybersecurity', name: 'Кібербезпека' },
    { id: 'internet', name: 'Інтернет безпека' }
  ];
  const difficulties = [
    { id: 'all', name: 'Всі рівні' },
    { id: 'beginner', name: 'Початківець' },
    { id: 'intermediate', name: 'Середній' },
    { id: 'advanced', name: 'Просунутий' }
  ];
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesDifficulty = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'all' || quiz.topic === selectedTopic;
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesTopic && matchesSearch;
  });
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '#27ae60';
      case 'intermediate': return '#f39c12';
      case 'advanced': return '#e74c3c';
      default: return '#666';
    }
  };
  return (
    <div className="quizzes-container">
      <div className="page-header">
        <h1>Вікторини</h1>
        <p className="header-description">
          Захоплюючі вікторини для перевірки та закріплення знань
        </p>
      </div>
      <div className="filters-section">
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Пошук вікторин..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filters">
          <div className="filter-group">
            <FaFilter />
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              {topics.map(topic => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <FaStar />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="quizzes-grid">
        {filteredQuizzes.map(quiz => (
          <div key={quiz.id} className="quiz-card">
            <div className="quiz-content">
              <h2>{quiz.title}</h2>
              <p>{quiz.description}</p>
              <div className="quiz-stats">
                <div className="stat">
                  <FaUsers />
                  <span>{quiz.playersCount} гравців</span>
                </div>
                <div className="stat">
                  <FaClock />
                  <span>{quiz.timeMinutes} хвилин</span>
                </div>
                <div className="stat">
                  <FaTrophy />
                  <span>{quiz.maxScore} балів</span>
                </div>
              </div>
            </div>
            <div className="quiz-footer">
              <div className="difficulty" style={{ color: getDifficultyColor(quiz.difficulty) }}>
                <FaStar />
                <span>{difficulties.find(d => d.id === quiz.difficulty).name}</span>
              </div>
              <button className="start-quiz-btn">Почати вікторину</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Quizzes; 