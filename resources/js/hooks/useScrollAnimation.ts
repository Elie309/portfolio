import { useEffect, useRef } from 'react';

type AnimationOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useScrollAnimation<T extends HTMLElement>(
  options: AnimationOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin]);

  return elementRef;
}