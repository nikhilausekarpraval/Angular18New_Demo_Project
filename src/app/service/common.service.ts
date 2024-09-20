import axios, { AxiosResponse } from 'axios';

export class CommonService<T> {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost:8080/api/';
    }

    // Get all records from a specific endpoint (base path + secondary path)
    getAll(secondPath: string = ''): Promise<AxiosResponse<T[]>> {
        return axios.get<T[]>(`${this.baseUrl}${secondPath}`);
    }

    // Get a single record by ID from a specific endpoint
    getSingle(id: number | string, secondPath: string = ''): Promise<AxiosResponse<T>> {
        return axios.get<T>(`${this.baseUrl}${secondPath}/${id}`);
    }

    // Create a new record at a specific endpoint
    create(data: T, secondPath: string = ''): Promise<AxiosResponse<T>> {
        return axios.post<T>(`${this.baseUrl}${secondPath}`, data);
    }

    // Update an existing record at a specific endpoint
    update(id: number | string, data: T, secondPath: string = ''): Promise<AxiosResponse<T>> {
        return axios.put<T>(`${this.baseUrl}${secondPath}`, data);
    }

    // Delete a record at a specific endpoint
    delete(id: number | string, secondPath: string = ''): Promise<AxiosResponse<void>> {
        return axios.delete<void>(`${this.baseUrl}${secondPath}=${id}`);
    }
}
