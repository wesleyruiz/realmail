import { BlocksContext } from '@/components/Provider/BlocksProvider';
import { useContext } from 'react';

export function useTransformScale() {
  const { scale, setScale } = useContext(BlocksContext);
  return {
    scale,
    setScale
  };
}