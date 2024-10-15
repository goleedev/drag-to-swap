import Image from 'next/image';
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
    style,
    isDragging,
  } = useDragAndDrop(id);

  return (
    <>
      <PrintPhoto
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        $isDragging={isDragging}
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
