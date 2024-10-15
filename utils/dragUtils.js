export const handleDragEnd = (event, setPages) => {
  const { active, over } = event;

  if (!over) return;

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
        newPages[activePage].images[activeIndex] = { ...overItem };
        newPages[overPage].images[overIndex] = activeItem;
      }

      return newPages;
    });
  }
};
