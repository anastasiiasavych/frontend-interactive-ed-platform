import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaQuestionCircle, 
  FaGamepad, 
  FaPuzzlePiece,
  FaStar
} from 'react-icons/fa';
import '../../styles/InteractiveTasks.css';
const InteractiveTasks = () => {
  const taskTypes = [
    {
      id: 'tests',
      title: 'Тести',
      description: 'Перевір свої знання за допомогою тестових завдань різної складності',
      icon: <FaQuestionCircle />,
      path: '/interactive/tests'
    },
    {
      id: 'quizzes',
      title: 'Вікторини',
      description: 'Захоплюючі вікторини на різні теми безпеки',
      icon: <FaGamepad />,
      path: '/interactive/quizzes'
    },
    {
      id: 'matching',
      title: 'Завдання на відповідність',
      description: 'Знайди правильні пари та розвивай логічне мислення',
      icon: <FaPuzzlePiece />,
      path: '/interactive/matching'
    }
  ];
  return (
    <div className="interactive-tasks-container">
      <div className="page-header">
        <h1>Інтерактивні завдання</h1>
        <p className="header-description">
          Ти можеш усе! Обери завдання та розвивай свої навички
        </p>
      </div>
      <div className="task-types-grid">
        {taskTypes.map(type => (
          <Link to={type.path} key={type.id} className="task-type-card">
            <div className="task-type-icon">{type.icon}</div>
            <h2>{type.title}</h2>
            <p>{type.description}</p>
            <div className="difficulty-levels">
              <FaStar className="beginner" title="Початківець" />
              <FaStar className="intermediate" title="Середній" />
              <FaStar className="advanced" title="Просунутий" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default InteractiveTasks; 