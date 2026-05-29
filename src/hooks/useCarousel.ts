import { useState } from 'react';

export function useCarousel(totalItems: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const paginate = (direction: number) => {
    setCurrentIndex((prev) => {
      let next = prev + direction;
      if (next < 0) next = totalItems - 1;
      if (next >= totalItems) next = 0;
      return next;
    });
  };

  const goTo = (index: number) => {
    const diff = index - currentIndex;
    if (Math.abs(diff) > totalItems / 2) {
      paginate(diff > 0 ? -1 : 1);
    } else {
      paginate(diff > 0 ? 1 : -1);
    }
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const absoluteDiff = Math.abs(diff);

    let position = diff;
    if (diff > totalItems / 2) position = diff - totalItems;
    if (diff < -totalItems / 2) position = diff + totalItems;

    return {
      transform: `translateX(${position * 350}px) translateZ(${-absoluteDiff * 300}px) rotateY(${position * 45}deg) scale(${absoluteDiff === 0 ? 1 : Math.max(0.6, 1 - absoluteDiff * 0.2)})`,
      opacity: absoluteDiff > 2 ? 0 : Math.max(0.3, 1 - absoluteDiff * 0.3),
      zIndex: totalItems - absoluteDiff,
    };
  };

  return { currentIndex, paginate, goTo, getCardStyle };
}