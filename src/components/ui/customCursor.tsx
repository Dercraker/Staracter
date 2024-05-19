'use client';

import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isNone, setIsPointer] = useState(false);

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  const handleMouseCursor = (e: MouseEvent) => {
    const cursorStyle = window.getComputedStyle(e.target as Element).cursor;
    setIsPointer(cursorStyle === 'none');
  };

  useEffect(() => {
    window.addEventListener('mouseenter', handleMouseCursor);
    window.addEventListener('mouseover', handleMouseCursor);
    window.addEventListener('mouseout', handleMouseCursor);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseenter', handleMouseCursor);
      window.removeEventListener('mouseover', handleMouseCursor);
      window.removeEventListener('mouseout', handleMouseCursor);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '64px',
        height: '32px',
        backgroundImage: isNone ? 'url(/cursor.png)' : 'none',
        backgroundSize: 'contain',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%) ',
        zIndex: 9999,
      }}
    ></div>
  );
};
