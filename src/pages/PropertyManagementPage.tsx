import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Button, Card, CardContent, Modal, Loading } from '../components';
import { PropertyForm } from '../components/properties';
import { usePropertySearch, usePropertyCRUD } from '../hooks';
import { formatCurrency } from '../utils';
import type { PropertyDto, CreatePropertyDto, UpdatePropertyDto } from '../types';

const PropertyManagementPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyDto | null>(null);

  const {
    data,
    isLoading: isSearchLoading,
    error: searchError,
    updateQuery,
    refetch,
  } = usePropertySearch({ page: 1, pageSize: 10 });

  const {
    isLoading: isCrudLoading,
    error: crudError,
    createProperty,
    updateProperty,
    deleteProperty,
    clearError,
  } = usePropertyCRUD();

  const handleCreate = async (propertyData: CreatePropertyDto) => {
    const result = await createProperty(propertyData);
    if (result) {
      setIsCreateModalOpen(false);
      refetch();
    }
  };

  const handleUpdate = async (propertyData: UpdatePropertyDto) => {
    if (!selectedProperty) return;
    
    const result = await updateProperty(selectedProperty.id, propertyData);
    if (result) {
      setIsEditModalOpen(false);
      setSelectedProperty(null);
      refetch();
    }
  };

  const handleDelete = async (property: PropertyDto) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${property.name}"?`)) {
      const success = await deleteProperty(property.id);
      if (success) {
        refetch();
      }
    }
  };

  const openEditModal = (property: PropertyDto) => {
    setSelectedProperty(property);
    setIsEditModalOpen(true);
  };

  const openViewModal = (property: PropertyDto) => {
    setSelectedProperty(property);
    setIsViewModalOpen(true);
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
    setSelectedProperty(null);
    clearError();
  };

  if (isSearchLoading && !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Propiedades
          </h1>
          <p className="text-gray-600">
            Administra el catálogo de propiedades inmobiliarias
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusIcon className="w-5 h-5 mr-2" />
          Nueva Propiedad
        </Button>
      </div>

      {/* Error Messages */}
      {(searchError || crudError) && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-700">
            {searchError || crudError}
          </div>
        </div>
      )}

      {/* Properties Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Propiedad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Año
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.items.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {property.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(property.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {property.codeInternal}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        property.status === 'Available' 
                          ? 'bg-green-100 text-green-800'
                          : property.status === 'Sold'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {property.status === 'Available' ? 'Disponible' : 
                         property.status === 'Sold' ? 'Vendida' : 'Reservada'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewModal(property)}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(property)}
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(property)}
                          disabled={isCrudLoading}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data && data.total > data.pageSize && (
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Mostrando {((data.page - 1) * data.pageSize) + 1} a {Math.min(data.page * data.pageSize, data.total)} de {data.total} propiedades
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuery({ page: data.page - 1 })}
                  disabled={data.page <= 1}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuery({ page: data.page + 1 })}
                  disabled={data.page >= Math.ceil(data.total / data.pageSize)}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={closeModals}
        title="Nueva Propiedad"
      >
        <PropertyForm
          onSubmit={handleCreate as any}
          onCancel={closeModals}
          isLoading={isCrudLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeModals}
        title="Editar Propiedad"
      >
        {selectedProperty && (
          <PropertyForm
            property={selectedProperty}
            onSubmit={handleUpdate as any}
            onCancel={closeModals}
            isLoading={isCrudLoading}
          />
        )}
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={closeModals}
        title="Detalles de la Propiedad"
      >
        {selectedProperty && (
          <Card>
            <CardContent>
              <div className="space-y-4">
                {selectedProperty.imageUrl && (
                  <img
                    src={selectedProperty.imageUrl}
                    alt={selectedProperty.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Nombre</h3>
                    <p className="text-gray-600">{selectedProperty.name}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Código</h3>
                    <p className="text-gray-600">{selectedProperty.codeInternal}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Precio</h3>
                    <p className="text-gray-600">{formatCurrency(selectedProperty.price)}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Año</h3>
                    <p className="text-gray-600">{selectedProperty.year}</p>
                  </div>
                  <div className="col-span-2">
                    <h3 className="font-semibold text-gray-900">Dirección</h3>
                    <p className="text-gray-600">{selectedProperty.address}</p>
                  </div>
                  {selectedProperty.description && (
                    <div className="col-span-2">
                      <h3 className="font-semibold text-gray-900">Descripción</h3>
                      <p className="text-gray-600">{selectedProperty.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </Modal>
    </div>
  );
};

export default PropertyManagementPage;