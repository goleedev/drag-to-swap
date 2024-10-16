import { renderHook } from '@testing-library/react';

import { useInitialData } from '../useInitialData';

describe('useInitialData', () => {
  it('returns the correct structure', () => {
    const mockData = [{ title: 'Page 1', images: ['image1.jpg'] }];
    const { result } = renderHook(() => useInitialData(mockData));

    expect(result.current[0]).toHaveProperty('title');
    expect(result.current[0]).toHaveProperty('images');
    expect(Array.isArray(result.current[0].images)).toBe(true);
  });

  it('adds correct ids to images', () => {
    const mockData = [
      { title: 'Page 1', images: ['image1.jpg', 'image2.jpg'] },
    ];
    const { result } = renderHook(() => useInitialData(mockData));

    expect(result.current[0].images[0].id).toBe('0-0');
    expect(result.current[0].images[1].id).toBe('0-1');
  });

  it('fills missing images with null up to 2', () => {
    const mockData = [{ title: 'Page 1', images: ['image1.jpg'] }];
    const { result } = renderHook(() => useInitialData(mockData));

    expect(result.current[0].images).toHaveLength(2);
    expect(result.current[0].images[1].url).toBeNull();
  });

  it('handles multiple pages correctly', () => {
    const mockData = [
      { title: 'Page 1', images: ['image1.jpg'] },
      { title: 'Page 2', images: ['image2.jpg', 'image3.jpg'] },
    ];
    const { result } = renderHook(() => useInitialData(mockData));

    expect(result.current).toHaveLength(2);
    expect(result.current[0].images).toHaveLength(2);
    expect(result.current[1].images).toHaveLength(2);
    expect(result.current[1].images[0].id).toBe('1-0');
    expect(result.current[1].images[1].id).toBe('1-1');
  });
});
