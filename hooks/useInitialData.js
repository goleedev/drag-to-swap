import { useMemo } from 'react';

export const useInitialData = (data) => {
  return useMemo(
    () =>
      data.map((entry, pageIndex) => ({
        ...entry,
        images: entry.images
          .concat(Array(2 - entry.images.length).fill(null))
          .map((img, imgIndex) => ({
            id: `${pageIndex}-${imgIndex}`,
            url: img,
          })),
      })),
    [data]
  );
};
