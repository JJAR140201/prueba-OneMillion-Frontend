import { useState } from 'react';
import type { PropertyDto, CreatePropertyDto, UpdatePropertyDto } from '../types';
import { propertyService } from '../services/propertyService';

export function usePropertyCRUD() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProperty = async (data: CreatePropertyDto): Promise<PropertyDto | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const newProperty = await propertyService.createProperty(data);
      return newProperty;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error creating property';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProperty = async (id: string, data: UpdatePropertyDto): Promise<PropertyDto | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedProperty = await propertyService.updateProperty(id, data);
      return updatedProperty;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating property';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProperty = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await propertyService.deleteProperty(id);
      if (!success) {
        setError('Error deleting property');
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting property';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createProperty,
    updateProperty,
    deleteProperty,
    clearError: () => setError(null),
  };
}