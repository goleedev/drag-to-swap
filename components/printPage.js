import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useCallback, useMemo, useState } from 'react';

import { PageLayout, PrintWrapper, Wrapper } from '../styles/printPageStyles';
import { handleDragEnd } from '../utils/dragUtils';
import PageHeader from './pageHeader';
import SortableItem from './sortableItem';
import { useInitialData } from '../hooks/useInitialData';

const PrintPage = ({ data }) => {
  const initialData = useInitialData(data);
  const [pages, setPages] = useState(initialData);

  const onDragEnd = useCallback((event) => handleDragEnd(event, setPages), []);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <Wrapper>
        {pages.map((entry, pageIndex) => {
          const items = entry.images.map((img) => img.id);
          return (
            <PrintWrapper key={pageIndex}>
              <PageHeader title={entry.title} />
              <PageLayout>
                <SortableContext items={items}>
                  {entry.images.map((image) => (
                    <SortableItem
                      key={image.id}
                      id={image.id}
                      url={image.url}
                    />
                  ))}
                </SortableContext>
              </PageLayout>
            </PrintWrapper>
          );
        })}
      </Wrapper>
    </DndContext>
  );
};

export default PrintPage;
