import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Vestito } from '../homepage/homepage.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  vestitiNelCarrello: any;
  vestitiNelCarrello$ = Observable<any[]>;
  vestito: any;
  totalePrezzi: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartVestiti().subscribe((vestiti) => {
      this.vestitiNelCarrello = vestiti;
      console.log(this.vestitiNelCarrello);
    });
    this.cartService.getCartUpdated().subscribe((updated: boolean) => {
      if (updated) {
        this.cartService.getCartVestiti().subscribe((vestiti) => {
          this.vestitiNelCarrello = vestiti;
        });
      }
    });
  }
  rimuoviDalCarrello(index: number) {
    const vestito = this.vestitiNelCarrello[index];
    this.cartService.rimuoviDalCarrello(vestito);
    this.vestitiNelCarrello.splice(index, 1);
    console.log(this.vestitiNelCarrello);
  }
}
