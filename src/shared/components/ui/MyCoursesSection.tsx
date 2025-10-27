import React, { useEffect, useState } from "react";
const MyCoursesSection = () => {
  const [courses, setCourses] = useState([
    {
      id: 'in-progress-1',
      title: 'Пожежна безпека',
      progress: 35,
      lastAccessed: '10.06.2025',
      totalLessons: 12,
      completedLessons: 4
    }
  ]);
  
  const [completedCourses, setCompletedCourses] = useState([
    {
      id: 'completed-1',
      title: 'Основи безпеки життєдіяльності',
      completedDate: '12.05.2025',
      hasCertificate: true
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const renderCourseCard = (course, isCompleted = false) => {
    if (isCompleted) {
      return (
        <div key={course.id} className="col-12 mb-4 px-0">
          <div className="card shadow-sm border-0" style={{
            borderRadius: '1rem',
            background: 'rgba(240, 255, 244, 0.95)',
            border: '1px solid #d1fae5',
            padding: '0',
            width: '100%',
            maxWidth: 'none',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            height: '100px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '1.2rem 4rem 1.2rem 0.5rem',
              gap: '2rem',
              justifyContent: 'space-between'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                minWidth: '48px',
                height: '48px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.15)',
                flexShrink: 0
              }}>
                <span style={{ fontSize: '24px' }} role="img" aria-label="trophy">🏆</span>
              </div>
              
              <div style={{ 
                flex: 1, 
                minWidth: 0, 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 1rem 0 0.25rem'
              }}>
                <h5 className="fw-bold mb-1" style={{
                  fontSize: '1.15rem',
                  color: '#0f766e',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  margin: '0 0 0.5rem 0',
                  lineHeight: '1.3'
                }}>
                  {course.title}
                </h5>
                <div className="d-flex align-items-center" style={{ gap: '1.5rem', marginTop: '0.5rem' }}>
                  <span style={{
                    background: '#10b981',
                    color: 'white',
                    padding: '0.2rem 0.9rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)'
                  }}>
                    Завершено
                  </span>
                  <span className="text-muted d-flex align-items-center" style={{ 
                    whiteSpace: 'nowrap',
                    fontSize: '0.9rem',
                    color: '#4b5563'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="me-1" style={{ opacity: 0.7, flexShrink: 0 }}>
                      <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {course.completedDate}
                  </span>
                </div>
              </div>
              
              <button 
                className="btn btn-primary d-flex align-items-center"
                style={{
                  borderRadius: '12px',
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)'
                }}
                onClick={() => alert('Перегляд сертифікату')}
              >
                Сертифікат
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div key={course.id} className="col-12 mb-4 px-0">
        <div className="card shadow-sm border-0" style={{
          borderRadius: '1rem',
          background: 'rgba(240, 247, 255, 0.95)',
          border: '1px solid #e3f2fd',
          padding: '0',
          width: '100%',
          maxWidth: 'none',
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          height: '100px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1.2rem 4rem 1.2rem 0.5rem',
            gap: '2rem',
            justifyContent: 'space-between'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              minWidth: '48px',
              height: '48px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(13, 110, 253, 0.15)',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '24px' }} role="img" aria-label="in-progress">📚</span>
            </div>
            
            <div style={{ 
              flex: 1, 
              minWidth: 0, 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 1rem 0 0.25rem'
            }}>
              <h5 className="fw-bold mb-1" style={{
                fontSize: '1.15rem',
                color: '#0d6efd',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                margin: '0 0 0.5rem 0',
                lineHeight: '1.3'
              }}>
                {course.title}
              </h5>
              <div className="d-flex align-items-center" style={{ gap: '1.5rem', marginTop: '0.5rem' }}>
                <div style={{ flex: 1, maxWidth: '200px' }}>
                  <div className="progress" style={{ height: '8px', borderRadius: '4px' }}>
                    <div 
                      className="progress-bar bg-primary" 
                      role="progressbar" 
                      style={{ width: `${course.progress}%` }}
                      aria-valuenow={course.progress} 
                      aria-valuemin="0" 
                      aria-valuemax="100">
                    </div>
                  </div>
                  <div className="text-muted small mt-1">{course.progress}% завершено</div>
                </div>
                <span className="text-muted d-flex align-items-center" style={{ 
                  whiteSpace: 'nowrap',
                  fontSize: '0.9rem',
                  color: '#4b5563'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="me-1" style={{ opacity: 0.7, flexShrink: 0 }}>
                    <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {course.lastAccessed}
                </span>
              </div>
            </div>
            
            <button 
              className="btn btn-primary d-flex align-items-center"
              style={{
                borderRadius: '12px',
                padding: '0.5rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                background: 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(13, 110, 253, 0.2)'
              }}
              onClick={() => alert('Продовжити навчання')}
            >
              Продовжити
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div style={{
      background: 'rgba(255,255,255,0.7)',
      borderRadius: '1.5rem',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)',
      backdropFilter: 'blur(8px)',
      border: '1.5px solid #e6f0fa',
      padding: '2rem 1.5rem',
      marginTop: 24,
      marginBottom: 12
    }}>
      <div className="fw-bold text-theme mb-3" style={{fontSize: '1.3rem', letterSpacing: 1}}>Мої курси</div>
      {loading && <div>Завантаження курсів...</div>}
      {error && <div className="alert alert-danger text-center py-2">{error}</div>}
      
      {!loading && !error && (
        <>
          {courses.length > 0 ? (
            <div>
              {completedCourses.length > 0 && <h5 className="text-muted mb-3">Активні курси</h5>}
              <div className="row g-3">
                {courses.map(course => renderCourseCard(course))}
              </div>
            </div>
          ) : completedCourses.length === 0 ? (
            <div className="text-secondary text-center" style={{fontSize: 22, opacity: 0.8}}>
              <span role="img" aria-label="books">📚</span>
              <div>У вас ще немає курсів.</div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
export default MyCoursesSection;
