document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.age-group');
  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((centerX - x) / centerX) * 10;
    
    card.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg)
      translateZ(10px)
    `;
  };
  const resetCard = (card) => {
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0px)
    `;
  };
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => handleMouseMove(e, card));
    card.addEventListener('mouseleave', () => resetCard(card));
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'all 0.5s ease';
    });
  });
}); 