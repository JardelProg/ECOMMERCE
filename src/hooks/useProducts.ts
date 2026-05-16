import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';

// Module-level cache so the fetch only happens once per session
let cache: Product[] | null = null;
let fetchPromise: Promise<Product[]> | null = null;

async function loadProducts(): Promise<Product[]> {
  if (cache) return cache;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch('/products.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load products');
      return res.json() as Promise<Product[]>;
    })
    .then(data => {
      cache = data;
      return data;
    })
    .catch(err => {
      fetchPromise = null; // allow retry on error
      throw err;
    });

  return fetchPromise;
}

export interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  setProducts: (updater: Product[] | ((prev: Product[]) => Product[])) => void;
}

export function useProducts(): UseProductsResult {
  const [products, setProductsState] = useState<Product[]>(cache ?? []);
  const [loading, setLoading] = useState<boolean>(!cache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cache) {
      setProductsState(cache);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    loadProducts()
      .then(data => {
        if (!cancelled) {
          setProductsState(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message ?? 'Erro ao carregar produtos');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  const setProducts = useCallback(
    (updater: Product[] | ((prev: Product[]) => Product[])) => {
      setProductsState(prev => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        cache = next; // keep cache in sync when admin edits
        return next;
      });
    },
    []
  );

  return { products, loading, error, setProducts };
}
