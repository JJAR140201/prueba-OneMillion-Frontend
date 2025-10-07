import React from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { Button, Loading } from '../common';
import PropertyCard from './PropertyCard';
import { formatNumber } from '../../utils';
import type { PropertyDto, PagedResult } from '../../types';

export interface PropertyListProps {
  data: PagedResult<PropertyDto> | null;
  isLoading: boolean;
  error: string | null;
  onPropertyClick?: (property: PropertyDto) => void;
  onPageChange?: (page: number) => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
}

const PropertyList: React.FC<PropertyListProps> = ({
  data,
  isLoading,
  error,
  onPropertyClick,
  onPageChange,
  onNextPage,
  onPrevPage,
}) => {
  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loading size="lg" text="Cargando propiedades..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <HomeIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Error al cargar propiedades</h3>
          <p className="text-secondary-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <div className="text-center py-12">
        <HomeIcon className="h-16 w-16 mx-auto text-secondary-400 mb-4" />
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">
          No se encontraron propiedades
        </h3>
        <p className="text-secondary-600">
          Intenta ajustar los filtros de búsqueda para encontrar más resultados.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.total / data.pageSize);
  const startItem = (data.page - 1) * data.pageSize + 1;
  const endItem = Math.min(data.page * data.pageSize, data.total);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, data.page - 2);
      const end = Math.min(totalPages, data.page + 2);
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-secondary-600">
          Mostrando <span className="font-medium">{formatNumber(startItem)}</span> a{' '}
          <span className="font-medium">{formatNumber(endItem)}</span> de{' '}
          <span className="font-medium">{formatNumber(data.total)}</span> propiedades
        </div>
        
        {isLoading && (
          <div className="flex items-center text-sm text-secondary-600">
            <Loading size="sm" />
            <span className="ml-2">Actualizando...</span>
          </div>
        )}
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.items.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={onPropertyClick}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 border-t border-secondary-200">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevPage}
            disabled={data.page <= 1 || isLoading}
            leftIcon={<ChevronLeftIcon className="h-4 w-4" />}
          >
            Anterior
          </Button>

          <div className="flex items-center space-x-1">
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-secondary-500">...</span>
                ) : (
                  <Button
                    variant={page === data.page ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => onPageChange?.(page as number)}
                    disabled={isLoading}
                    className="min-w-[40px]"
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={data.page >= totalPages || isLoading}
            rightIcon={<ChevronRightIcon className="h-4 w-4" />}
          >
            Siguiente
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertyList;