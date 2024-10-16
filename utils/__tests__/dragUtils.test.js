import { handleDragEnd } from '../dragUtils';

describe('handleDragEnd', () => {
  let setPagesMock;

  beforeEach(() => {
    setPagesMock = jest.fn();
  });

  it('should not modify pages if there is no "over" item', () => {
    const event = {
      active: { id: 'activeItemId' },
      over: null,
    };

    handleDragEnd(event, setPagesMock);

    expect(setPagesMock).not.toHaveBeenCalled();
  });

  it('should not modify pages if active and over items are the same', () => {
    const event = {
      active: { id: 'img1' },
      over: { id: 'img1' },
    };

    handleDragEnd(event, setPagesMock);

    expect(setPagesMock).not.toHaveBeenCalled();
  });
});
