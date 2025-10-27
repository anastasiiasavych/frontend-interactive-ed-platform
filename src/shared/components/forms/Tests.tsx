import React, { useState } from 'react';
import { FaStar, FaFilter, FaSearch } from 'react-icons/fa';
import '../../styles/TestsPage.css';
const Tests = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const tests = [
    {
      id: 1,
      title: 'Основи безпеки в інтернеті',
      description: 'Перевір свої знання про безпечне користування інтернетом',
      difficulty: 'beginner',
      topic: 'internet',
      questionsCount: 10,
      timeMinutes: 15
    },
    {
      id: 2,
      title: 'Кібербезпека для просунутих',
      description: 'Тестування знань про захист від кіберзагроз',
      difficulty: 'advanced',
      topic: 'cybersecurity',
      questionsCount: 15,
      timeMinutes: 20
    },
    {
      id: 3,
      title: 'Безпека в соціальних мережах',
      description: 'Тест на знання правил безпечного спілкування',
      difficulty: 'intermediate',
      topic: 'social',
      questionsCount: 12,
      timeMinutes: 18
    }
  ];
  const topics = [
    { id: 'all', name: 'Всі теми' },
    { id: 'internet', name: 'Інтернет безпека' },
    { id: 'cybersecurity', name: 'Кібербезпека' },
    { id: 'social', name: 'Соціальні мережі' }
  ];
  const difficulties = [
    { id: 'all', name: 'Всі рівні' },
    { id: 'beginner', name: 'Початківець' },
    { id: 'intermediate', name: 'Середній' },
    { id: 'advanced', name: 'Просунутий' }
  ];
  const filteredTests = tests.filter(test => {
    const matchesDifficulty = selectedDifficulty === 'all' || test.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'all' || test.topic === selectedTopic;
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchQuery.toLowerCase());
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
    <div className="tests-container">
      <div className="page-header">
        <h1>Тести</h1>
        <p className="header-description">
          Перевір свої знання та отримай оцінку своїх навичок
        </p>
      </div>
      <div className="filters-section">
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Пошук тестів..."
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
      <div className="tests-grid">
        {filteredTests.map(test => (
          <div key={test.id} className="test-card">
            <div className="test-content">
              <h2>{test.title}</h2>
              <p>{test.description}</p>
              <div className="test-meta">
                <span className="questions-count">{test.questionsCount} питань</span>
                <span className="time-estimate">{test.timeMinutes} хвилин</span>
              </div>
            </div>
            <div className="test-footer">
              <div className="difficulty" style={{ color: getDifficultyColor(test.difficulty) }}>
                <FaStar />
                <span>{difficulties.find(d => d.id === test.difficulty).name}</span>
              </div>
              <button className="start-test-btn">Почати тест</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tests; 