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
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('touchmove', (e) => updatePosition(e.touches[0]));

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('touchmove', (e) =>
        updatePosition(e.touches[0])
      );
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
