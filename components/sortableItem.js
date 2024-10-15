import { useSortable } from '@dnd-kit/sortable';
import Image from 'next/image';
import styled from 'styled-components';

import ImageIcon from './icons/ImageIcon';
import { colors, size } from '../styles/theme';

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

  &.fill-circle {
    animation: circle-fill 0.8s forwards;
  }

  @keyframes circle-fill {
    0% {
      clip-path: circle(0% at 50% 50%);
    }
    100% {
      clip-path: circle(100% at 50% 50%);
    }
  }
`;

const SortableItem = ({ id, url }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useSortable({ id });

  return (
    <PrintPhoto
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ opacity: isDragging ? 0.8 : 1 }}
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
  );
};

export default SortableItem;
