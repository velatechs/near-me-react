import { useState, useEffect } from 'react';

const imageCache = new Set();

const useImageLoader = (src) => {
  const [loading, setLoading] = useState(!imageCache.has(src));

  useEffect(() => {
    if (!src || imageCache.has(src)) {
      setLoading(false);
      return;
    }

    const image = new Image();
    image.src = src;
    image.onload = () => {
      imageCache.add(src);
      setLoading(false);
    };
    image.onerror = () => {
      setLoading(false);
    };

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return loading;
};

export default useImageLoader;