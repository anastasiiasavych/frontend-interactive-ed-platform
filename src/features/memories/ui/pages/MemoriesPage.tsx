import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MemoriesPage.css";
import { API_BASE_URL } from '@infrastructure/config';
interface Memory {
  id: string;
  title: string;
  content: string;
  courseTitle: string;
  createdAt: string;
}

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };
  useEffect(() => {
    const testMemories = [
      {
        id: 'test-obsj-1',
        title: 'Правила безпеки для дітей',
        content: 'Важливі правила безпеки:\n\n' +
                 '1. Не чіпай електроприлади мокрими руками\n' +
                 '2. Ніколи не грайся з вогнем\n' +
                 '3. Не відчиняй двері незнайомим\n' +
                 '4. Переходь дорогу тільки на зелений світлофор\n' +
                 '5. Не спілкуйся з незнайомцями\n' +
                 '6. Номери екстрених служб:\n    • 101 - Пожежна служба (коли щось горить)\n    • 102 - Поліція (якщо хтось порушує закон)\n    • 103 - Швидка допомога (якщо комусь погано)\n    • 112 - Єдиний номер екстреної допомоги (з мобільного)\n\n    Дзвони тільки у разі справжньої небезпеки!\n' +
                 '7. Знайди безпечне місце, якщо потрібна допомога\n' +
                 '8. Не чіпай знайдені на вулиці предмети',
        courseTitle: 'Основи безпеки життєдіяльності',
        createdAt: '2025-05-12T00:00:00.000Z'
      },
      {
        id: 'test-fire-1',
        title: 'Основи пожежної безпеки',
        content: '1. Не залишай увімкненими електроприлади, коли виходиш з дому\n' +
                '2. Не грайся зі сірниками, запальничками та іншими джерелами вогню\n' +
                '3. Не розпалюй багаття без дорослих\n' +
                '4. Не засмічуй під\'їзди та сходові клітки\n' +
                '5. Якщо побачив дим чи вогонь:\n    • Не ховайся, швидко виходь на свіже повітря\n    • Повідом дорослих\n    • Виклич пожежну охорону за номером 101\n\n' +
                '6. При невеликому займанні можна використати пожежний вогнегасник або накрити вогонь щільним вологою тканиною\n' +
                '7. При пожежі не користуйся ліфтом\n' +
                '8. Якщо загорівся одяг - лягай на підлогу і котись, щоб згасити полум\'я',
        courseTitle: 'Основи безпеки життєдіяльності',
        createdAt: '2025-05-12T00:00:00.000Z'
      }
    ];
    
    setMemories(testMemories);
    setLoading(false);
  }, []);
  return (
    <div className="memories-page">
      <div className="memories-container">
        <div className="memories-header">
          <button className="memories-back-btn" onClick={() => navigate(-1)} aria-label="Назад">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="14" cy="14" r="14" fill="#e0e7ff"/>
              <path d="M16.7 9.3L12 14L16.7 18.7" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="memories-header-content">
            <span className="memories-header-icon" role="img" aria-label="memories">📝</span>
            <span className="memories-title">Мої Пам'ятки</span>
          </div>
        </div>
        {loading && <div>Завантаження...</div>}
        {error && <div className="memories-alert">{error}</div>}
        {!loading && !error && (
          memories.length === 0 ? (
            <div className="memories-empty">
              <span style={{fontSize:'2.1rem',display:'block',marginBottom:12}}>📭</span>
              У вас ще немає збережених пам'яток.<br />Ви будете отримувати пам'ятки під час проходження курсів!
            </div>
          ) : (
            <div className="memories-list">
              {memories.map((memory, idx) => (
                <div className="memory-card-wrapper">
                  <div 
                    key={memory.id || idx} 
                    className={`memory-card ${expandedCard === memory.id ? 'expanded' : 'collapsed'}`}
                    onClick={() => toggleCard(memory.id)}
                  >
                    <div className="memory-card-header">
                      <div className="memory-title">{memory.title}</div>
                    </div>
                    <div className="memory-card-body">
                      <div className="memory-content" style={{whiteSpace: 'pre-line'}}>
                        {memory.content.split('\n').map((line, i) => (
                          <div key={i} style={{marginBottom: '8px'}}>{line}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="memory-card-footer">
                    {memory.courseTitle && <div className="memory-course">Курс: <b>{memory.courseTitle}</b></div>}
                    {memory.createdAt && (
                      <div className="memory-date">
                        {new Date(memory.createdAt).toLocaleDateString('uk-UA', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
