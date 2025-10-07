import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Button, Input, Card, CardContent } from '../common';
import { formatCurrency } from '../../utils';
import type { PropertySearchQuery } from '../../types';

export interface PropertyFiltersProps {
  query: PropertySearchQuery;
  onQueryChange: (updates: Partial<PropertySearchQuery>) => void;
  onClear: () => void;
  isLoading?: boolean;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  query,
  onQueryChange,
  onClear,
  isLoading = false,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    name: query.name || '',
    address: query.address || '',
    minPrice: query.minPrice?.toString() || '',
    maxPrice: query.maxPrice?.toString() || '',
  });

  const handleInputChange = (field: keyof typeof localFilters, value: string) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
    
    // Update query immediately for text fields, or when user stops typing
    if (field === 'name' || field === 'address') {
      onQueryChange({ [field]: value || undefined });
    }
  };

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
    
    // Convert to number and update query
    const numValue = value ? parseFloat(value) : undefined;
    onQueryChange({ [field]: numValue });
  };

  const handleClear = () => {
    setLocalFilters({
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
    });
    onClear();
  };

  const hasActiveFilters = query.name || query.address || query.minPrice || query.maxPrice;

  return (
    <Card className="mb-6">
      <CardContent>
        <div className="space-y-4">
          {/* Basic Search */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Buscar por nombre"
              placeholder="Ej: Casa moderna, Apartamento centro..."
              value={localFilters.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
            <Input
              label="Buscar por dirección"
              placeholder="Ej: Madrid, Barcelona, Valencia..."
              value={localFilters.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              leftIcon={<FunnelIcon className="h-4 w-4" />}
            >
              {showAdvanced ? 'Ocultar filtros' : 'Filtros avanzados'}
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                leftIcon={<XMarkIcon className="h-4 w-4" />}
                className="text-red-600 hover:text-red-700"
              >
                Limpiar filtros
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="pt-4 border-t border-secondary-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Precio mínimo (€)"
                  type="number"
                  placeholder="0"
                  value={localFilters.minPrice}
                  onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                  helperText={localFilters.minPrice ? 
                    `Desde ${formatCurrency(parseFloat(localFilters.minPrice))}` : 
                    undefined
                  }
                />
                <Input
                  label="Precio máximo (€)"
                  type="number"
                  placeholder="Sin límite"
                  value={localFilters.maxPrice}
                  onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                  helperText={localFilters.maxPrice ? 
                    `Hasta ${formatCurrency(parseFloat(localFilters.maxPrice))}` : 
                    undefined
                  }
                />
              </div>

              {/* Quick Price Ranges */}
              <div className="mt-4">
                <p className="text-sm font-medium text-secondary-700 mb-2">Rangos rápidos:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Hasta 150K', max: 150000 },
                    { label: '150K - 300K', min: 150000, max: 300000 },
                    { label: '300K - 500K', min: 300000, max: 500000 },
                    { label: '500K - 1M', min: 500000, max: 1000000 },
                    { label: 'Más de 1M', min: 1000000 },
                  ].map((range) => (
                    <Button
                      key={range.label}
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setLocalFilters(prev => ({
                          ...prev,
                          minPrice: range.min?.toString() || '',
                          maxPrice: range.max?.toString() || '',
                        }));
                        onQueryChange({
                          minPrice: range.min,
                          maxPrice: range.max,
                        });
                      }}
                      className="text-xs"
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="pt-4 border-t border-secondary-200">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium text-secondary-700">Filtros activos:</span>
                {query.name && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
                    Nombre: {query.name}
                  </span>
                )}
                {query.address && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
                    Dirección: {query.address}
                  </span>
                )}
                {(query.minPrice || query.maxPrice) && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800">
                    Precio: {query.minPrice ? formatCurrency(query.minPrice) : '0'} - {query.maxPrice ? formatCurrency(query.maxPrice) : '∞'}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyFilters;