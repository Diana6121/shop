import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

export interface Vestito {
  prezzo: any;
  name: string;
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  mostraDescrizione: boolean;
}
export interface Categoria {
  name: string;
  id: number;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  [x: string]: any;
  vestiti: Vestito[] = [];
  categorie: Categoria[] = [];
  categoriaSelezionata!: string;
  vestitiFiltrati: Vestito[] = [];
  isPulsanteAbilitato: boolean = true;
  nuovoVestito!: Vestito;
  nuovoVestitoAggiunto: any;
  mostraVestitoAggiunto: boolean = false;
  ricercaCategoria: string = '';
  numberOfItems!: number;
  vestito: any;
  carrello: any[] = [];
  filtro: string = '';
  lunghezzaCarrello: number = 0;
  vestitiNelCarrello: any[] = [];

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private CartService: CartService,
  ) {}

  aggiungiAlCarrello(vestito: any) {
    console.log(vestito);
    this.CartService.aggiungiAlCarrello(vestito);
    console.log(this.aggiungiAlCarrello.length);

    // const cartData = {
    //   userId: 1,
    //   date: '2023-11-16',
    //   products: [{ productId: vestito.id }],
    // };

    // fetch('https://fakestoreapi.com/carts', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(cartData),
    // })
    //   .then((res) => res.json())
    //   .then((response) =>
    //     console.log("Risposta API dopo l'aggiunta:", response),
    //   );
  }
  /*  localStorage.setItem('carrello', this.numberOfItems.toString())
   */

  goToCart(): void {
    // if (this.router) {
    //   this.router.navigate(['cart']);
    // }
  }
  ngOnInit() {
    this.CartService.getLunghezzaCarrello().subscribe((length) => {
      this.lunghezzaCarrello = length;
      this.CartService.getCartUpdated().subscribe((updated: boolean) => {
        if (updated) {
          this['refreshCartData']();
          // Aggiorna i dati del carrello sulla homepage
          // chiamando un metodo per ottenere nuovi dati dal Carrello
        }
      });
    });
    this.CartService.getCartUpdated().subscribe((updated: boolean) => {
      if (updated) {
        this.refreshCartData();
      }
    });
    this.http
      .get<Categoria[]>('https://fakestoreapi.com/products/categories')
      .subscribe((categorie) => {
        this.categorie = categorie;
      });

    this.apiService.getProducts().subscribe((products) => {
      this.vestiti = products;
      this.vestitiFiltrati = this.vestiti;
      console.log('Vestiti caricati:', this.vestiti);
    });
  }

  mostraDescrizioneVestito(vestito: Vestito): void {
    vestito.mostraDescrizione = !vestito.mostraDescrizione;
  }

  caricaVestiti(categoria: any) {
    this.http
      .get<Vestito[]>(
        'https://fakestoreapi.com/products/category/' +
          categoria +
          this.ricercaCategoria,
      )
      .subscribe((vestiti) => {
        this.vestiti = vestiti;
      });
  }

  selezionaCategoria(categoria: string): void {
    this.categoriaSelezionata = categoria;
    this.caricaVestiti(this.categoriaSelezionata);
    this.ricercaCategoria = '';
  }
  applyFilter() {
    console.log('Vestiti prima del filtro:', this.vestiti);

    let filteredClothes = [];
    if (!this.ricercaCategoria || this.ricercaCategoria.trim().length === 0) {
      this.vestitiFiltrati = this.vestiti.slice();
    } else {
      const filteredClothes = this.vestiti.filter((vestito) => {
        return vestito.title
          .toLowerCase()
          .includes(this.ricercaCategoria.toLowerCase());

        /* const nomeVestito = vestito.title && vestito.title.toLowerCase();
      return nomeVestito; */
      });
      console.log(filteredClothes);
      this.vestitiFiltrati = filteredClothes;
      console.log('Vestiti filtrati:', this.vestitiFiltrati);
    }
  }

  delete(id: number) {
    fetch('https://fakestoreapi.com/products/' + id, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        this.vestiti = this.vestiti.filter((vestito) => vestito.id !== id);
        this.vestitiFiltrati = this.vestitiFiltrati.filter(
          (vestito) => vestito.id !== id,
        );
      });
  }
  refreshCartData() {}
}
function getCarrelloLength() {
  throw new Error('Function not implemented.');
}
