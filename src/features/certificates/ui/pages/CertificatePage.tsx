import React from 'react';
import './CertificatePage.css';
const stampImage = '/images/stamp.png';

const CertificatePage = () => {
  return (
    <div className="certificate-container">
      <div className="certificate">
        <h1 className="certificate-title">Сертифікат про закінчення курсу</h1>
        <p className="certificate-text">
          Цим сертифікатом засвідчується, що
          <br />
          <span className="certificate-name">Савич Анастасія</span>
          <br />
          успішно завершила курс
          <br />
          <span className="certificate-course">«Основи безпеки життєдіяльності»</span>
          <br />
          <br />
          {/* Дата видалена */}
        </p>
        <div className="certificate-details">
          <div className="certificate-date">
            Дата видачі: <span>12 травня 2025</span>
          </div>
          <div className="certificate-signatures">
            <div className="signature">
              <img src={stampImage} alt="Печатка" className="stamp-image" />
              <div className="signature-line" />
              <div className="signature-label">Печатка</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;
