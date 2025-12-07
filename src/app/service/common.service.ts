import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export class CommonService<T> {
    private http = inject(HttpClient);
    private baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost:8080/api/';
    }

    // Get all records from a specific endpoint
    getAll(secondPath: string = ''): Observable<T[]> {
        return this.http.get<T[]>(`${this.baseUrl}${secondPath}`);
    }

    // Get a single record by ID from a specific endpoint
    getSingle(id: number | string, secondPath: string = ''): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}${secondPath}/${id}`);
    }

    // Create a new record at a specific endpoint
    create(data: T, secondPath: string = ''): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}${secondPath}`, data);
    }

    // Update an existing record at a specific endpoint
    update(id: number | string, data: T, secondPath: string = ''): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}${secondPath}/${id}`, data);
    }

    // Delete a record at a specific endpoint
    delete(id: number | string, secondPath: string = ''): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}${secondPath}/${id}`);
    }
}

