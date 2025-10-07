import { useState, useEffect, useCallback } from 'react';
import type { PropertyDto, PropertySearchQuery, PagedResult } from '../types';
import { propertyService } from '../services/propertyService';
import { useDebounce } from './index';

export function usePropertySearch(initialQuery?: Partial<PropertySearchQuery>) {
  const [query, setQuery] = useState<PropertySearchQuery>({
    page: 1,
    pageSize: 20,
    ...initialQuery,
  });

  const [data, setData] = useState<PagedResult<PropertyDto> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce search terms to avoid excessive API calls
  const debouncedName = useDebounce(query.name || '', 500);
  const debouncedAddress = useDebounce(query.address || '', 500);

  const searchProperties = useCallback(async (searchQuery: PropertySearchQuery) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await propertyService.searchProperties(searchQuery);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error searching properties');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Execute search when debounced values or other parameters change
  useEffect(() => {
    const searchQuery = {
      ...query,
      name: debouncedName || undefined,
      address: debouncedAddress || undefined,
    };

    searchProperties(searchQuery);
  }, [debouncedName, debouncedAddress, query.minPrice, query.maxPrice, query.page, query.pageSize, searchProperties]);

  const updateQuery = useCallback((updates: Partial<PropertySearchQuery>) => {
    setQuery(prev => ({
      ...prev,
      ...updates,
      // Reset to first page when search parameters change
      page: updates.page || (updates.name !== undefined || updates.address !== undefined || 
             updates.minPrice !== undefined || updates.maxPrice !== undefined ? 1 : prev.page),
    }));
  }, []);

  const nextPage = useCallback(() => {
    if (data && query.page < Math.ceil(data.total / query.pageSize)) {
      updateQuery({ page: query.page + 1 });
    }
  }, [data, query.page, query.pageSize, updateQuery]);

  const prevPage = useCallback(() => {
    if (query.page > 1) {
      updateQuery({ page: query.page - 1 });
    }
  }, [query.page, updateQuery]);

  const goToPage = useCallback((page: number) => {
    updateQuery({ page });
  }, [updateQuery]);

  return {
    query,
    data,
    isLoading,
    error,
    updateQuery,
    nextPage,
    prevPage,
    goToPage,
    refetch: () => searchProperties(query),
  };
}

export function useProperty(id: string) {
  const [property, setProperty] = useState<PropertyDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    propertyService.getPropertyById(id)
      .then(setProperty)
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Error loading property');
        setProperty(null);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return { property, isLoading, error };
}