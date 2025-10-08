import type { PropertyDto, PropertySearchQuery, PagedResult, CreatePropertyDto, UpdatePropertyDto } from '../types';
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
    if (query.idOwner) params.idOwner = query.idOwner;
    if (query.codeInternal) params.codeInternal = query.codeInternal;
    if (query.year) params.year = query.year;
    if (query.minYear) params.minYear = query.minYear;
    if (query.maxYear) params.maxYear = query.maxYear;
    if (query.sortBy) params.sortBy = query.sortBy;
    if (query.sortOrder) params.sortOrder = query.sortOrder;

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

  async getAllProperties(
    sortBy: string = 'Price',
    sortOrder: 'asc' | 'desc' = 'desc',
    page: number = 1,
    pageSize: number = 50
  ): Promise<PagedResult<PropertyDto>> {
    try {
      const params = new URLSearchParams({
        sortBy,
        sortOrder,
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
      
      const url = `${this.baseUrl}/all?${params.toString()}`;
      const response = await apiService.get<PagedResult<PropertyDto>>(url);
      return response.data;
    } catch (error) {
      console.error('Error getting all properties:', error);
      throw error;
    }
  }

  async getPropertyById(id: string): Promise<PropertyDto> {
    try {
      const response = await apiService.get<PropertyDto>(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting property by id:', error);
      throw error;
    }
  }

  async createProperty(dto: CreatePropertyDto): Promise<PropertyDto> {
    try {
      const response = await apiService.post<PropertyDto>(this.baseUrl, dto);
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  }

  async updateProperty(id: string, dto: UpdatePropertyDto): Promise<PropertyDto> {
    try {
      const response = await apiService.put<PropertyDto>(`${this.baseUrl}/${id}`, dto);
      return response.data;
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  }

  async deleteProperty(id: string): Promise<boolean> {
    try {
      await apiService.delete(`${this.baseUrl}/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting property:', error);
      return false;
    }
  }
}

export const propertyService = new PropertyService();
export default propertyService;