import React from 'react';
import { 
  HomeIcon, 
  MapPinIcon, 
  CurrencyEuroIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import { Card, CardContent } from '../common';
import { formatCurrency, formatNumber } from '../../utils';
import type { PropertyDto } from '../../types';

export interface PropertyCardProps {
  property: PropertyDto;
  onClick?: (property: PropertyDto) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const handleClick = () => {
    onClick?.(property);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'Available':
        return 'text-green-600 bg-green-100';
      case 'Sold':
        return 'text-red-600 bg-red-100';
      case 'Rented':
        return 'text-blue-600 bg-blue-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-secondary-600 bg-secondary-100';
    }
  };

  const getPropertyTypeIcon = (type?: string) => {
    switch (type) {
      case 'House':
        return <HomeIcon className="h-4 w-4" />;
      case 'Apartment':
      case 'Condo':
        return <BanknotesIcon className="h-4 w-4" />;
      default:
        return <HomeIcon className="h-4 w-4" />;
    }
  };

  return (
    <Card 
      className={`h-full transition-all duration-300 hover:scale-105 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      padding="none"
    >
      <CardContent>
        {/* Image */}
        <div className="relative h-48 bg-secondary-200 rounded-t-xl overflow-hidden">
          {property.imageUrl ? (
            <img
              src={property.imageUrl}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <HomeIcon className="h-16 w-16 text-secondary-400" />
            </div>
          )}
          
          {/* Status Badge */}
          {property.status && (
            <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
              {property.status}
            </div>
          )}

          {/* Property Type */}
          {property.propertyType && (
            <div className="absolute top-3 left-3 px-2 py-1 bg-black bg-opacity-50 text-white rounded-full text-xs font-medium flex items-center space-x-1">
              {getPropertyTypeIcon(property.propertyType)}
              <span>{property.propertyType}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-secondary-900 mb-2 line-clamp-2">
              {property.name}
            </h3>
            
            {/* Address */}
            <div className="flex items-center text-secondary-600 mb-3">
              <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm line-clamp-1">{property.address}</span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-primary-600">
                <CurrencyEuroIcon className="h-5 w-5 mr-1" />
                <span className="text-xl font-bold">
                  {formatCurrency(property.price)}
                </span>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between text-sm text-secondary-600 pt-4 border-t border-secondary-200">
            {property.bedrooms && (
              <div className="flex items-center">
                <span className="font-medium">{property.bedrooms}</span>
                <span className="ml-1">hab.</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center">
                <span className="font-medium">{property.bathrooms}</span>
                <span className="ml-1">baños</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center">
                <span className="font-medium">{formatNumber(property.area)}</span>
                <span className="ml-1">m²</span>
              </div>
            )}
          </div>

          {/* Description Preview */}
          {property.description && (
            <p className="text-sm text-secondary-600 mt-3 line-clamp-2">
              {property.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;