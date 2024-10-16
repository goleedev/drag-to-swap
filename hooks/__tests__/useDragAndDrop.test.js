import { renderHook } from '@testing-library/react';

import { useDragAndDrop } from '../useDragAndDrop';

describe('useDragAndDrop', () => {
  it('returns an object with expected properties', () => {
    const { result } = renderHook(() => useDragAndDrop('test-id'));

    expect(result.current).toHaveProperty('attributes');
    expect(result.current).toHaveProperty('listeners');
    expect(result.current).toHaveProperty('setNodeRef');
    expect(result.current).toHaveProperty('isDragging');
    expect(result.current).toHaveProperty('position');
    expect(result.current).toHaveProperty('showPreview');
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useDragAndDrop('test-id'));

    expect(result.current.isDragging).toBe(false);
    expect(result.current.position).toEqual({ x: 0, y: 0 });
    expect(result.current.showPreview).toBe(false);
  });
});
