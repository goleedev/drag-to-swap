import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import { colors, size, spacing } from '../styles/theme';
import Actions from './actions';

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

  img {
    display: block;
    max-width: ${size.full};
    height: auto;
  }
`;

const SortableItem = ({ id, url }) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id });

  return (
    <PrintPhoto ref={setNodeRef} {...attributes} {...listeners}>
      {url ? (
        <Image
          width={600}
          height={400}
          src={url}
          alt={`Test Image ${id}`}
          loading="eager"
        />
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width="18"
            height="18"
          >
            <path
              fill="#585858"
              fillRule="evenodd"
              d="M1.6 5.003C1 6.18 1 7.72 1 10.8v2.4c0 3.08 0 4.62.6 5.797A5.5 5.5 0 0 0 4.002 21.4C5.18 22 6.72 22 9.8 22h4.4c3.08 0 4.62 0 5.797-.6a5.5 5.5 0 0 0 2.404-2.403C23 17.82 23 16.28 23 13.2v-2.4c0-3.08 0-4.62-.6-5.797a5.5 5.5 0 0 0-2.403-2.404C18.82 2 17.28 2 14.2 2H9.8c-3.08 0-4.62 0-5.797.6a5.5 5.5 0 0 0-2.404 2.403m1.781.908C3 6.66 3 7.64 3 9.6v4.8c0 1.882 0 2.86.337 3.598l5.538-5.537a1.6 1.6 0 0 1 2.262 0l.727.758c.023.024-.534 1.263-.534 1.263l.922-.906 3.379-3.378a1.6 1.6 0 0 1 2.262 0L21 13.305V9.6c0-1.96 0-2.94-.381-3.689a3.5 3.5 0 0 0-1.53-1.53C18.34 4 17.36 4 15.4 4H8.6c-1.96 0-2.94 0-3.689.381a3.5 3.5 0 0 0-1.53 1.53m1.53 13.708a4 4 0 0 1-.235-.132l5.33-5.33 1.292 1.293.22.22-1 2.483 1.734-1.749 4.51-4.51 4.222 4.223c-.03.895-.116 1.483-.366 1.972a3.5 3.5 0 0 1-1.529 1.53C18.34 20 17.36 20 15.4 20H8.6c-1.96 0-2.94 0-3.689-.381M9 8.5C9 7.673 8.327 7 7.5 7S6 7.673 6 8.5 6.673 10 7.5 10 9 9.327 9 8.5"
              clipRule="evenodd"
            ></path>
          </svg>
        </>
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

        if (activeItem && overItem) {
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
