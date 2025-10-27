import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@hooks/redux';
import { useCourses } from '@hooks/useQueryCourses';
import { useNavigate } from 'react-router-dom';
import '@shared/lib/utils/tiltEffect';
import TopicsCarousel from '@shared/components/ui/TopicsCarousel';

const childPhoto = '/images/child-photo.png';
const teenagerPhoto = '/images/teenager-photo.png';
const adultPhoto = '/images/adult-photo.png';
const studentImage = '/images/3d-student.png';
const HomePage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth);
  const { data: courses, isLoading } = useCourses();
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const topics = [
    {
      icon: "🔥",
      title: "Пожежна безпека",
      description: "Навчись запобігати та діяти при пожежах",
      color: "from-red-100 to-red-200"
    },
    {
      icon: "🌊",
      title: "Безпека на воді",
      description: "Правила поведінки на воді та порятунку",
      color: "from-blue-100 to-blue-200"
    },
    {
      icon: "🏥",
      title: "Перша домедична допомога",
      description: "Базові навички надання першої допомоги",
      color: "from-green-100 to-green-200"
    },
    {
      icon: "🚨",
      title: "Правила поведінки в умовах воєнного конфлікту",
      description: "Правила поведінки в надзвичайних ситуаціях",
      color: "from-yellow-100 to-yellow-200"
    },
    {
      icon: "🚶",
      title: "Евакуація та поведінка в натовпі",
      description: "Як діяти при масовому скупченні людей",
      color: "from-purple-100 to-purple-200"
    },
    {
      icon: "🏠",
      title: "Безпека в побуті",
      description: "Основи безпечного життя вдома",
      color: "from-indigo-100 to-indigo-200"
    }
  ];
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    translateX: Math.random() * 200 - 100,
    translateY: Math.random() * 200 - 100,
  }));
  return (
    <div className="landing-page bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-progress bg-gradient-to-r from-blue-600 to-purple-600" 
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
      {/* Animated Background */}
      <div className="animated-bg" />
      {/* Particle System */}
      <div className="particle-system">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      {/* Decorative Elements */}
      <div className="decorative-blob blob-1"></div>
      <div className="decorative-blob blob-2"></div>
      <div className="decorative-blob blob-3"></div>
      <div className="floating-shapes">
        <div className="shape triangle shape-1"></div>
        <div className="shape square shape-2"></div>
        <div className="shape circle shape-3"></div>
        <div className="shape ring shape-4"></div>
        <div className="shape triangle shape-5"></div>
      </div>
      <div className="grid-pattern"></div>
      <div className="glow-effect glow-1"></div>
      <div className="glow-effect glow-2"></div>
      <div className="glow-effect glow-3"></div>
      <div className="interactive-dot dot-pulse dot-1"></div>
      <div className="interactive-dot dot-pulse dot-2"></div>
      <div className="interactive-dot dot-pulse dot-3"></div>
      <div className="interactive-dot dot-pulse dot-4"></div>
      <div className="connection-line line-1"></div>
      <div className="connection-line line-2"></div>
      <div className="connection-line line-3"></div>
      {/* Navigation */}
      <nav className="nav-bar">
        <div className="nav-left">
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <div className="nav-logo">
              <img src="/logo.svg" alt="Твоя Безпека" />
              <div className="nav-title">
                <span className="main-text">Твоя безпека</span>
                <span className="nav-title-247">24/7</span>
              </div>
            </div>
            <div className="nav-links">
              <a href="#courses">Курси</a>
              <a href="#categories">Категорії</a>
              <a href="#contact">Контакти</a>
            </div>
          </div>
        </div>
        <div className="nav-right">
          <button className="register-btn" onClick={() => navigate('/login')}>
            Увійти
            <span role="img" aria-label="Стрілка вправо">→</span>
          </button>
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-circle hero-bg-circle-1"></div>
        <div className="hero-bg-circle hero-bg-circle-2"></div>
        
        <div className="hero-floating-element hero-floating-1"></div>
        <div className="hero-floating-element hero-floating-2"></div>
        <div className="hero-floating-element hero-floating-3"></div>
        
        <div className="hero-text">
          <h1>Твоя безпека - у твоїх рішеннях</h1>
          <p>
            Ми формуємо середовище, де кожен має можливість здобути знання та навички для захисту себе й оточуючих, адже усвідомлення небезпек і вміння діяти — ключ до безпеки.
          </p>
          <button>
            Почати навчання
          </button>
        </div>
        
        <div className="hero-image">
          <div className="hero-image-wrapper">
            <img 
              src={studentImage}
              alt="3D ілюстрація студентів"
            />
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="double-arrow"></div>
        </div>
        <div className="hero-mouse-trail"></div>
      </section>
      {/* Age Groups Section */}
      <section className="age-groups-section">
        <h2 className="age-section-title">Безпека для кожного віку</h2>
        
        <div className="section-header">
          <div className="header-features">
            <div className="feature">
              <span className="feature-icon">📚</span>
              <span className="feature-text">Адаптивні матеріали</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🎮</span>
              <span className="feature-text">Інтерактивне навчання</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🎓</span>
              <span className="feature-text">Індивідуальний темп</span>
            </div>
          </div>
        </div>
          
        <div className="age-groups">
          <div className="age-group" data-age="child">
            <div className="age-group-image">
              <img src={childPhoto} alt="Діти 6-12 років" />
              <div className="age-overlay">6-12 років</div>
            </div>
            <div className="age-group-content">
              <h3 className="age-group-title">Програми для 6-12 років</h3>
              <p className="age-group-description">
                Розвиток базових навичок безпеки у форматі гри. Інтерактивні завдання та захопливі історії для наймолодших.
              </p>
              <button className="age-group-link">Обрати програму</button>
            </div>
          </div>
          <div className="age-group" data-age="teenager">
            <div className="age-group-image">
              <img src={teenagerPhoto} alt="Підлітки 13-17 років" />
              <div className="age-overlay">13-17 років</div>
            </div>
            <div className="age-group-content">
              <h3 className="age-group-title">Програми для 13-17 років</h3>
              <p className="age-group-description">
                Поглиблене вивчення правил безпеки та формування критичного мислення для прийняття зважених рішень.
              </p>
              <button className="age-group-link">Обрати програму</button>
            </div>
          </div>
          <div className="age-group" data-age="adult">
            <div className="age-group-image">
              <img src={adultPhoto} alt="Дорослі 18+" />
              <div className="age-overlay">18+ років</div>
            </div>
            <div className="age-group-content">
              <h3 className="age-group-title">Програми для дорослих</h3>
              <p className="age-group-description">
                Професійні курси з безпеки для дорослих. Комплексний підхід до особистої та колективної безпеки.
              </p>
              <button className="age-group-link">Обрати програму</button>
            </div>
          </div>
        </div>
      </section>
      {/* Topics Section */}
      <section className="categories-section">
        {/* Decorative Elements */}
        <div className="floating-shape shape-circle"></div>
        <div className="floating-shape shape-square"></div>
        <div className="floating-shape shape-triangle"></div>
        
        <div className="gradient-line line-1"></div>
        <div className="gradient-line line-2"></div>
        
        <div className="floating-dot dot-1"></div>
        <div className="floating-dot dot-2"></div>
        <div className="floating-dot dot-3"></div>
        
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        
        <div className="grid-pattern"></div>
        <div className="categories-header">
          <h2 className="section-title">Досліди тематику представлених курсів</h2>
        </div>
        <TopicsCarousel topics={topics} />
      </section>
      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-header">
            <h2>Розвивай життєво важливі навички</h2>
            <p>Наша платформа допомагає формувати ключові компетенції для безпечного життя</p>
          </div>
          <div className="benefits-content">
            <div className="benefits-cards">
              <div className="benefit-card">
                <div className="benefit-card-inner">
                  <div className="benefit-icon">⚡</div>
                  <h3>Швидка реакція</h3>
                  <p>Коли важлива кожна секунда — тренуйся діяти без вагань</p>
                  <div className="benefit-stats">
                    <div className="stat">
                      <span className="stat-number">15+</span>
                      <span className="stat-label">навчальних ситуацій, де швидкість рятує</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="benefit-card featured">
                <div className="benefit-card-inner">
                  <div className="benefit-icon">🎯</div>
                  <h3>Прийняття рішень</h3>
                  <p>Ризик, стрес, невизначеність — вчися робити вибір усвідомлено</p>
                  <div className="benefit-stats">
                    <div className="stat">
                      <span className="stat-number">20+</span>
                      <span className="stat-label">сценаріїв із різними наслідками</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="benefit-card">
                <div className="benefit-card-inner">
                  <div className="benefit-icon">🤝</div>
                  <h3>Відповідальність</h3>
                  <p>Твоя поведінка має значення. Для тебе. І для інших</p>
                  <div className="benefit-stats">
                    <div className="stat">
                      <span className="stat-number">15+</span>
                      <span className="stat-label">кейсів, де вибір впливає на безпеку оточення</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-top">
            <div className="footer-message">
              <h2>Готові почати навчання?</h2>
              <p>Приєднуйтесь до нашої спільноти та отримайте доступ до всіх курсів</p>
              <button className="cta-button" onClick={() => navigate('/signup')}>
                Почати безкоштовно
                <span>→</span>
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-info">
              <div className="footer-logo">
                <img src="/logo.svg" alt="Твоя Безпека" />
                <div className="logo-text">
                  <span className="main-text">Твоя безпека</span>
                  <span className="accent">24/7</span>
                </div>
              </div>
              <div className="footer-links">
                <button onClick={() => navigate('/courses')}>Курси</button>
                <button onClick={() => navigate('/categories')}>Категорії</button>
                <button onClick={() => navigate('/contact')}>Контакти</button>
              </div>
            </div>
            
            <div className="footer-contact">
              <div className="contact-item">
                <span className="icon">📧</span>
                <a href="mailto:info@safety24.com">info@safety24.com</a>
              </div>
              <div className="contact-item">
                <span className="icon">📱</span>
                <a href="tel:+380123456789">+38 (012) 345-67-89</a>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <p>© 2024 Твоя безпека 24/7</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default HomePage;
