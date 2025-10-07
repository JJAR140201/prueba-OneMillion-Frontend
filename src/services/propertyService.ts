import type { PropertyDto, PropertySearchQuery, PagedResult } from '../types';
import { apiService } from './api';

class PropertyService {
  private readonly baseUrl = '/properties';

  async searchProperties(query: PropertySearchQuery): Promise<PagedResult<PropertyDto>> {
    const params: Record<string, any> = {
      page: query.page,
      pageSize: query.pageSize,
    };

    // Solo agregar parámetros si tienen valor
    if (query.name) params.name = query.name;
    if (query.address) params.address = query.address;
    if (query.minPrice !== undefined) params.minPrice = query.minPrice;
    if (query.maxPrice !== undefined) params.maxPrice = query.maxPrice;

    try {
      // Construir URL con parámetros de consulta
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.set(key, String(value));
        }
      });
      
      const url = `${this.baseUrl}?${searchParams.toString()}`;
      const response = await apiService.get<PagedResult<PropertyDto>>(url);
      return response.data;
    } catch (error) {
      console.error('Error searching properties:', error);
      if (error instanceof Error) {
        throw new Error(`Error al buscar propiedades: ${error.message}`);
      }
      throw new Error('Error de conexión con el servidor. Verifica que la API esté ejecutándose en http://localhost:5000');
    }
  }

  async getPropertyById(id: string): Promise<PropertyDto> {
    const response = await apiService.get<PropertyDto>(`${this.baseUrl}/${id}`);
    return response.data;
  }
}

export const propertyService = new PropertyService();
export default propertyService;