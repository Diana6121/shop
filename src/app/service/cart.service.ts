import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private vestitiNelCarrello: any[] = [];
  private cartVestitiSubject = new BehaviorSubject<any[]>([]);
  private cartUpdatedSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.recuperaDatiLocalStorage();
  }
  private recuperaDatiLocalStorage() {
    const carrelloLocalStorage = localStorage.getItem('carrello');
    if (carrelloLocalStorage) {
      this.cartVestitiSubject.next([...this.vestitiNelCarrello]);
    }
  }

  getCartVestiti(): Observable<any[]> {
    return this.cartVestitiSubject.pipe(
      map((vestiti) => vestiti.filter((vestito) => !vestito.rimosso)),
    );
  }

  aggiungiAlCarrello(vestito: any) {
    this.vestitiNelCarrello.push(vestito);
    this.cartVestitiSubject.next([...this.vestitiNelCarrello]);
    localStorage.setItem('carrello', JSON.stringify(this.vestitiNelCarrello));
  }
  getLunghezzaCarrello(): Observable<number> {
    return this.cartVestitiSubject.pipe(map((vestiti) => vestiti.length));
  }
  getCartUpdated(): Observable<boolean> {
    return this.cartUpdatedSubject.asObservable();
  }

  rimuoviDalCarrello(vestito: any) {
    const index = this.vestitiNelCarrello.indexOf(vestito);
    if (index !== -1) {
      this.vestitiNelCarrello[index].rimosso = true;
      this.vestitiNelCarrello.splice(index, 1);
      this.cartVestitiSubject.next([...this.vestitiNelCarrello]);
      localStorage.setItem('carrello', JSON.stringify(this.vestitiNelCarrello));
      console.log(vestito);
    }
  }
}
