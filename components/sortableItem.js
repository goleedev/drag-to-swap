import { useSortable } from '@dnd-kit/sortable';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import { colors, size } from '../styles/theme';
import ImageIcon from './icons/ImageIcon';

const PrintPhoto = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(50% - 10px);
  background-color: ${colors.lightGrey}60;
  cursor: pointer;
  transition: opacity 0.3s ease;
  overflow: hidden;

  img {
    display: block;
    max-width: ${size.full};
    height: auto;
    transition: opacity 0.8s ease;

    :hover {
      opacity: 0.8;
    }
  }
`;

const DragPreview = styled.div`
  position: fixed;
  width: 100px;
  height: 100px;
  overflow: hidden;

  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 5px solid ${colors.white};
  z-index: 100;
  pointer-events: none;
`;

const SortableItem = ({ id, url }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id });

  const [showPreview, setShowPreview] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [withinBounds, setWithinBounds] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      if (isDragging) {
        const x = e.clientX;
        const y = e.clientY;

        const isWithinBounds =
          x > 0 && y > 0 && x < window.innerWidth && y < window.innerHeight;

        setWithinBounds(isWithinBounds);
        setPosition({ x, y });
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('touchmove', (e) => updatePosition(e.touches[0]));

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('touchmove', (e) =>
        updatePosition(e.touches[0])
      );
    };
  }, [isDragging]);

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
                alt={`Dragging ${id}`}
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
