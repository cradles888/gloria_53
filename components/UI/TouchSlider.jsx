'use client'
import { useState, useRef, useEffect } from 'react';

const TouchSlider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  
  const startX = useRef(0);
  const startY = useRef(0);
  const startOffset = useRef(0);
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const isHorizontalScroll = useRef(false);
  
  const totalSlides = children.length;
  
  // Определяем количество карточек в зависимости от ширины экрана
  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsToShow(1.2);
      } else if (width < 768) {
        setCardsToShow(1.5);
      } else if (width < 1024) {
        setCardsToShow(2);
      } else if (width < 1280) {
        setCardsToShow(2.5);
      } else {
        setCardsToShow(3);
      }
    };
    
    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);
  
  // Получаем ширину контейнера
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  const cardWidth = containerWidth / cardsToShow;
  const maxIndex = Math.max(0, Math.ceil(totalSlides - cardsToShow));
  const maxOffset = Math.max(0, (totalSlides - cardsToShow) * cardWidth);
  
  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === maxIndex;
  
  // Функция для расчета правильного смещения в конце
  const getBaseTranslate = () => {
    if (isAtEnd && maxIndex > 0) {
      return -maxOffset;
    }
    return -currentIndex * cardWidth;
  };
  
  // Расчет смещения с учетом границ
  const calculateConstrainedOffset = (offset) => {
    const currentTranslate = getBaseTranslate();
    const newTranslate = currentTranslate + offset;
    
    if (newTranslate > 0 || newTranslate < -maxOffset) {
      return offset * 0.3;
    }
    return offset;
  };
  
  // Начало касания/клика
  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    
    startX.current = clientX;
    startY.current = clientY;
    startOffset.current = dragOffset;
    isHorizontalScroll.current = false;
    
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grabbing';
    }
  };
  
  // Движение
  const handleDragMove = (e) => {
    if (!isDragging) return;
    
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    
    const deltaX = Math.abs(clientX - startX.current);
    const deltaY = Math.abs(clientY - startY.current);
    
    // Определяем направление скролла (горизонтальный или вертикальный)
    if (!isHorizontalScroll.current && (deltaX > 5 || deltaY > 5)) {
      isHorizontalScroll.current = deltaX > deltaY;
    }
    
    // Если это горизонтальный свайп - предотвращаем скролл страницы
    if (isHorizontalScroll.current) {
      e.preventDefault();
      e.stopPropagation();
      
      let newOffset = startOffset.current + (clientX - startX.current);
      newOffset = calculateConstrainedOffset(newOffset);
      
      setDragOffset(newOffset);
    }
  };
  
  // Завершение
  const handleDragEnd = (e) => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Если это был горизонтальный свайп - обрабатываем переключение слайда
    if (isHorizontalScroll.current) {
      const threshold = cardWidth * 0.2;
      let newIndex = currentIndex;
      
      if (Math.abs(dragOffset) > threshold) {
        if (dragOffset < 0 && !isAtEnd) {
          newIndex = Math.min(currentIndex + 1, maxIndex);
        } else if (dragOffset > 0 && !isAtStart) {
          newIndex = Math.max(currentIndex - 1, 0);
        }
      }
      
      setCurrentIndex(newIndex);
    }
    
    setDragOffset(0);
    
    if (sliderRef.current) {
      sliderRef.current.style.cursor = 'grab';
    }
    
    isHorizontalScroll.current = false;
  };
  
  // Расчет transform
  const getTransform = () => {
    const baseTranslate = getBaseTranslate();
    const translate = baseTranslate + dragOffset;
    return `translateX(${translate}px)`;
  };
  
  // Переключение слайдов
  const goToPrev = () => {
    if (!isAtStart) {
      setCurrentIndex(currentIndex - 1);
      setDragOffset(0);
    }
  };
  
  const goToNext = () => {
    if (!isAtEnd) {
      setCurrentIndex(currentIndex + 1);
      setDragOffset(0);
    }
  };
  
  return (
    <div className={`w-[93vw] width-container padding-last-slide max-w-[1440px] overflow-hidden`}>
      <div className="w-full mx-auto">
        {/* Контейнер с кнопками над слайдером - только для десктопа */}
        <div className="flex justify-end items-center mb-6">
          <div className="flex gap-3">
            <button
              onClick={goToPrev}
              disabled={isAtStart}
              className={`
                w-11 h-11 rounded-full flex items-center justify-center
                transition-all duration-200 shadow-sm
                ${isAtStart 
                  ? 'bg-gray-100 cursor-not-allowed opacity-50' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md active:scale-95'
                }
              `}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={isAtStart ? 'opacity-40' : ''}
              >
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button
              onClick={goToNext}
              disabled={isAtEnd}
              className={`
                w-11 h-11 rounded-full flex items-center justify-center
                transition-all duration-200 shadow-sm
                ${isAtEnd 
                  ? 'bg-gray-100 cursor-not-allowed opacity-50' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md active:scale-95'
                }
              `}
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={isAtEnd ? 'opacity-40' : ''}
              >
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Слайдер */}
        <div className="relative rounded-4xl">
          <div 
            ref={containerRef}
            className="overflow-hidden rounded-4xl"
          >
            <div 
              ref={sliderRef}
              className="cursor-grab active:cursor-grabbing select-none touch-pan-y"
              style={{ touchAction: 'pan-y pinch-zoom' }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              <div
                className="flex"
                style={{
                  transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: getTransform(),
                  willChange: 'transform'
                }}
              >
                {children.map((child, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 px-2 sm:px-2 md:px-2"
                    style={{ 
                      width: `${cardWidth}px`,
                    }}
                  >
                    {child}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Индикаторы */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setDragOffset(0);
                }}
                className={`
                  transition-all duration-300 cursor-pointer rounded-full
                  ${currentIndex === idx 
                    ? 'w-6 sm:w-7 h-1 bg-gray-800' 
                    : 'w-2 h-1 bg-gray-300 hover:bg-gray-400'
                  }
                `}
              />
            ))}
          </div>
        )}
        
        {/* Счетчик */}
        {maxIndex > 0 && (
          <div className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
            {currentIndex + 1} / {maxIndex + 1}
          </div>
        )}
      </div>
    </div>
  );
};

export default TouchSlider;