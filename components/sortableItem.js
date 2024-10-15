import { useSortable } from '@dnd-kit/sortable';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { DragPreview, PrintPhoto } from '../styles/sortableItemStyles';
import ImageIcon from './icons/ImageIcon';

const SortableItem = ({ id, url }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id });

  const [showPreview, setShowPreview] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
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

  return (
    <>
      <PrintPhoto
        ref={setNodeRef}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        {...attributes}
        {...listeners}
      >
        {url ? (
          <Image
            width={600}
            height={400}
            src={url}
            alt={`Test Image ${id}`}
            loading="eager"
          />
        ) : (
          <ImageIcon />
        )}
      </PrintPhoto>

      {showPreview &&
        createPortal(
          <DragPreview style={{ left: position.x, top: position.y }}>
            {url && (
              <Image
                src={url}
                alt={`Preview ${id}`}
                width={100}
                height={100}
                objectFit="cover"
                loading="eager"
              />
            )}
          </DragPreview>,
          document.body
        )}
    </>
  );
};

export default SortableItem;
