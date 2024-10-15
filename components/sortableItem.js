import Image from 'next/image';
import { useCallback } from 'react';
import { createPortal } from 'react-dom';

import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { DragPreview, PrintPhoto } from '../styles/sortableItemStyles';
import ImageIcon from './icons/ImageIcon';

const SortableItem = ({ id, url }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    showPreview,
    position,
    isDragging,
  } = useDragAndDrop(id);

  const renderDragPreview = useCallback(() => {
    return url ? (
      <Image
        src={url}
        alt={`Preview ${id}`}
        width={100}
        height={100}
        objectFit="cover"
        loading="eager"
      />
    ) : null;
  }, [url, id]);

  return (
    <>
      <PrintPhoto
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        $isDragging={isDragging}
        $hasUrl={url}
      >
        {url ? (
          <Image
            width={600}
            height={400}
            src={url}
            alt={`Test Image ${id}`}
            loading="lazy"
          />
        ) : (
          <ImageIcon />
        )}
      </PrintPhoto>

      {showPreview &&
        createPortal(
          <DragPreview
            style={{
              left: position.x,
              top: position.y,
              display: url ? 'block' : 'none',
            }}
          >
            {renderDragPreview()}
          </DragPreview>,
          document.body
        )}
    </>
  );
};

export default SortableItem;
