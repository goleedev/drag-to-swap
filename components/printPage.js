import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import { colors, size, spacing } from '../styles/theme';
import Actions from './actions';
import ImageIcon from './icons/ImageIcon';

const Wrapper = styled.div`
  width: 600px;
  margin: auto;

  color: ${colors.grey};
`;

const PrintWrapper = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: ${size.md};
  line-height: ${size.lg};
`;

const PageLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${spacing.lg};
  margin: 17px 0 42px;

  background: ${colors.blue};
  border-radius: 8px;
`;

const PrintPhoto = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(50% - 10px);

  background-color: ${colors.lightGrey}60;
  cursor: pointer;
  transition: opacity 0.3s ease;

  img {
    display: block;
    max-width: ${size.full};
    height: auto;

    :hover {
      opacity: 0.8;
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

const PrintPage = ({ data }) => {
  const initialData = data.map((entry, pageIndex) => ({
    ...entry,
    images: entry.images
      .concat(Array(2 - entry.images.length).fill(null))
      .map((img, imgIndex) => ({
        id: `${pageIndex}-${imgIndex}`,
        url: img,
      })),
  }));
  const [pages, setPages] = useState(initialData);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }
    if (active.id !== over.id) {
      setPages((prevPages) => {
        const newPages = [...prevPages];
        let activeItem, overItem;
        let activePage, activeIndex, overPage, overIndex;

        newPages.forEach((page, pageIndex) => {
          page.images.forEach((img, imgIndex) => {
            if (img.id === active.id) {
              activeItem = img;
              activePage = pageIndex;
              activeIndex = imgIndex;
            }
            if (img.id === over.id) {
              overItem = img;
              overPage = pageIndex;
              overIndex = imgIndex;
            }
          });
        });

        if (activeItem?.url && overItem) {
          newPages[activePage].images[activeIndex] = {
            ...overItem,
          };
          newPages[overPage].images[overIndex] = activeItem;
        }

        return newPages;
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Wrapper>
        {pages.map((entry, pageIndex) => (
          <PrintWrapper key={pageIndex}>
            <Header>
              <Title>{entry.title}</Title>
              <Actions />
            </Header>

            <PageLayout>
              <SortableContext items={entry.images.map((img) => img.id)}>
                {entry.images.map((image) => (
                  <SortableItem key={image.id} id={image.id} url={image.url} />
                ))}
              </SortableContext>
            </PageLayout>
          </PrintWrapper>
        ))}
      </Wrapper>
    </DndContext>
  );
};

export default PrintPage;
