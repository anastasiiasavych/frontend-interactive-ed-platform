import React from 'react';
import './CertificateDemoPage.css';
import { FaCertificate } from 'react-icons/fa';
const stamp = '/images/stamp.png';
const CertificateDemoPage = () => {
  return (
    <div className="certificate-demo-page">
      <div className="certificate-card">
        <header className="certificate-header">
          <FaCertificate size={48} color="#2563eb" />
          <h1>Сертифікат про закінчення курсу</h1>
        </header>
        <section className="certificate-body">
          <h2>Основи безпеки життєдіяльності</h2>
          <p>Цей сертифікат підтверджує, що ви успішно завершили курс та отримали знання з основ безпеки життєдіяльності.</p>
          <div className="certificate-info">
            <div>
              <span className="label">Ім'я студента:</span>
              <span className="value">Марія Іванова</span>
            </div>
            <div>
              <span className="label">Дата завершення:</span>
              <span className="value">11 червня 2025</span>
            </div>
          </div>
        </section>
        <footer className="certificate-footer">
          <div className="stamp">
            <img src={stamp} alt="Печатка Твоя безпека 24/7" />
          </div>
        </footer>
        {/* Decorative elements */}
        <div className="decorative-shapes">
          <div className="shape circle"></div>
          <div className="shape square"></div>
          <div className="shape triangle"></div>
        </div>
      </div>
    </div>
  );
};
export default CertificateDemoPage;
