import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private categoriesUrl = 'https://fakestoreapi.com/products/categories';
  private productsUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.categoriesUrl);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productsUrl).pipe(
      map((products) =>
        products.map((vestito) => ({
          ...vestito,
          mostraDescrizione: false,
        })),
      ),
    );
  }

  aggiungiVestito(nuovoVestito: any): Observable<any> {
    return this.http.post<any>(this.productsUrl, nuovoVestito);
  }
}
