import { useSortable } from '@dnd-kit/sortable';
import { useCallback, useEffect, useState } from 'react';

export const useDragAndDrop = (id) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id });

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showPreview, setShowPreview] = useState(false);
  const [withinBounds, setWithinBounds] = useState(false);

  const updatePosition = useCallback(
    (e) => {
      if (isDragging) {
        const x = e.clientX;
        const y = e.clientY;

        const isWithinBounds =
          x > 0 && y > 0 && x < window.innerWidth && y < window.innerHeight;

        setWithinBounds(isWithinBounds);
        setPosition({ x, y });
      }
    },
    [isDragging]
  );

  useEffect(() => {
    const handleMouseMove = (e) => updatePosition(e);
    const handleTouchMove = (e) => updatePosition(e.touches[0]);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [updatePosition]);

  useEffect(() => {
    setShowPreview(isDragging && withinBounds);
  }, [isDragging, withinBounds]);

  return {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    showPreview,
    position,
  };
};
