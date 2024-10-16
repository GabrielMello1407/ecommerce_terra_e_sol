import { Size } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async (): Promise<Size[]> => {
  // Added cache no store to fix the cache bug in my navigator
  const res = await fetch(URL, { cache: 'no-store' });

  const data = await res.json();

  return data;
};

export default getSizes;
