import { useState } from 'react';
 
export function useModal<T = undefined>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(null);
 
  const open = (payload?: T) => {
    if (payload !== undefined) setData(payload as T);
    setIsOpen(true);
  };
 
  const close = () => {
    setIsOpen(false);
    setData(null);
  };
 
  return { isOpen, data, open, close };
}