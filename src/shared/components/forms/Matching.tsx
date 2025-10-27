import React, { useState } from 'react';
import { FaStar, FaFilter, FaSearch, FaPuzzlePiece, FaClock, FaUsers } from 'react-icons/fa';
import '../../styles/Matching.css';
const Matching = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const matchingExercises = [
    {
      id: 1,
      title: 'Безпечні та небезпечні дії онлайн',
      description: 'Зіставте правильні та неправильні дії при користуванні інтернетом',
      difficulty: 'beginner',
      topic: 'internet',
      playersCount: 980,
      timeMinutes: 8,
      pairsCount: 8
    },
    {
      id: 2,
      title: 'Кіберзагрози та захист',
      description: 'Знайдіть відповідності між типами загроз та методами захисту',
      difficulty: 'advanced',
      topic: 'cybersecurity',
      playersCount: 650,
      timeMinutes: 12,
      pairsCount: 12
    },
    {
      id: 3,
      title: 'Безпека в соціальних мережах',
      description: 'Співставте правила безпеки з відповідними ситуаціями',
      difficulty: 'intermediate',
      topic: 'social',
      playersCount: 820,
      timeMinutes: 10,
      pairsCount: 10
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
  const filteredExercises = matchingExercises.filter(exercise => {
    const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === 'all' || exercise.topic === selectedTopic;
    const matchesSearch = exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
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
    <div className="matching-container">
      <div className="page-header">
        <h1>Завдання на відповідність</h1>
        <p className="header-description">
          Розвивай логічне мислення та закріплюй знання через пошук відповідностей
        </p>
      </div>
      <div className="filters-section">
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Пошук завдань..."
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
      <div className="matching-grid">
        {filteredExercises.map(exercise => (
          <div key={exercise.id} className="matching-card">
            <div className="matching-content">
              <h2>{exercise.title}</h2>
              <p>{exercise.description}</p>
              <div className="matching-stats">
                <div className="stat">
                  <FaUsers />
                  <span>{exercise.playersCount} гравців</span>
                </div>
                <div className="stat">
                  <FaClock />
                  <span>{exercise.timeMinutes} хвилин</span>
                </div>
                <div className="stat">
                  <FaPuzzlePiece />
                  <span>{exercise.pairsCount} пар</span>
                </div>
              </div>
            </div>
            <div className="matching-footer">
              <div className="difficulty" style={{ color: getDifficultyColor(exercise.difficulty) }}>
                <FaStar />
                <span>{difficulties.find(d => d.id === exercise.difficulty).name}</span>
              </div>
              <button className="start-matching-btn">Почати завдання</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Matching; 