import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarelloService {
  private carrello: [] = [];

  aggiungiAlCarrello(): void {
    this.carrello.push();
  }


  getCarrello(): [] {
    return this.carrello;
  }
}

