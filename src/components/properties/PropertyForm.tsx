import React, { useState, useEffect } from 'react';
import { Button, Input, Card, CardContent } from '../common';
import type { PropertyDto, CreatePropertyDto, UpdatePropertyDto } from '../../types';

interface PropertyFormProps {
  property?: PropertyDto;
  onSubmit: (data: CreatePropertyDto | UpdatePropertyDto) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  property,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    price: 0,
    idOwner: '',
    codeInternal: '',
    year: new Date().getFullYear(),
    description: '',
    imageUrl: '',
    bedrooms: 0,
    bathrooms: 0,
    squareMeters: 0,
    propertyType: 'House' as 'House' | 'Apartment' | 'Condo' | 'Townhouse' | 'Commercial',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (property) {
      setFormData({
        name: property.name || '',
        address: property.address || '',
        price: property.price || 0,
        idOwner: property.idOwner || '',
        codeInternal: property.codeInternal || '',
        year: property.year || new Date().getFullYear(),
        description: property.description || '',
        imageUrl: property.imageUrl || '',
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        squareMeters: property.squareMeters || 0,
        propertyType: (property.propertyType || 'House') as 'House' | 'Apartment' | 'Condo' | 'Townhouse' | 'Commercial',
      });
    }
  }, [property]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    if (formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    if (!formData.idOwner.trim()) {
      newErrors.idOwner = 'El ID del propietario es requerido';
    }

    if (!formData.codeInternal.trim()) {
      newErrors.codeInternal = 'El código interno es requerido';
    }

    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 5) {
      newErrors.year = 'El año debe estar entre 1900 y ' + (new Date().getFullYear() + 5);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'year' || name === 'bedrooms' || name === 'bathrooms' || name === 'squareMeters'
        ? Number(value) || 0
        : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {property ? 'Editar Propiedad' : 'Nueva Propiedad'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Ej: Casa familiar en zona norte"
            />

            <Input
              label="Código Interno *"
              name="codeInternal"
              value={formData.codeInternal}
              onChange={handleChange}
              error={errors.codeInternal}
              placeholder="Ej: PROP-001"
            />
          </div>

          <Input
            label="Dirección *"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            placeholder="Ej: Calle Principal 123, Madrid"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Precio (€) *"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={errors.price}
              placeholder="250000"
            />

            <Input
              label="Año de construcción *"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
              error={errors.year}
              placeholder="2020"
            />
          </div>

          <Input
            label="ID Propietario *"
            name="idOwner"
            value={formData.idOwner}
            onChange={handleChange}
            error={errors.idOwner}
            placeholder="Ej: OWNER-123"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Habitaciones"
              name="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="3"
            />

            <Input
              label="Baños"
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="2"
            />

            <Input
              label="Metros cuadrados"
              name="squareMeters"
              type="number"
              value={formData.squareMeters}
              onChange={handleChange}
              placeholder="120"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Propiedad
            </label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="House">Casa</option>
              <option value="Apartment">Apartamento</option>
              <option value="Condo">Condominio</option>
              <option value="Townhouse">Casa adosada</option>
              <option value="Commercial">Comercial</option>
            </select>
          </div>

          <Input
            label="URL de Imagen"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descripción detallada de la propiedad..."
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : property ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;