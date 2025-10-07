import React from 'react';
import { PropertyFilters, PropertyList } from '../components/properties';
import { usePropertySearch } from '../hooks';
import type { PropertyDto } from '../types';

const PropertiesPage: React.FC = () => {
  const {
    query,
    data,
    isLoading,
    error,
    updateQuery,
    nextPage,
    prevPage,
    goToPage,
  } = usePropertySearch();

  const handlePropertyClick = (property: PropertyDto) => {
    console.log('Property clicked:', property);
    // TODO: Navigate to property detail page
    // navigate(`/properties/${property.id}`);
  };

  const handleClearFilters = () => {
    updateQuery({
      name: undefined,
      address: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      page: 1,
    });
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">
            Encuentra tu propiedad ideal
          </h1>
          <p className="text-lg text-secondary-600">
            Explora nuestra selección de propiedades disponibles para compra y alquiler.
          </p>
        </div>

        <PropertyFilters
          query={query}
          onQueryChange={updateQuery}
          onClear={handleClearFilters}
          isLoading={isLoading}
        />

        <PropertyList
          data={data}
          isLoading={isLoading}
          error={error}
          onPropertyClick={handlePropertyClick}
          onPageChange={goToPage}
          onNextPage={nextPage}
          onPrevPage={prevPage}
        />
      </div>
    </div>
  );
};

export default PropertiesPage;