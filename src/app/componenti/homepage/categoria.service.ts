import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'https://fakestoreapi.com/products/categories';

  constructor(private http: HttpClient) { }

  getProductsByCategory(category: string): Observable<any[]> {
    const url = `${this.apiUrl}/category/${category}`;
    return this.http.get<any[]>(url);
  }
}
