import { Component, OnInit, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarelloService } from 'src/app/carello.service';



interface Vestito {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    mostraDescrizione: boolean;
}
interface Categoria {
  name: string;
  id: number
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
  vestitiFiltrati!: Vestito[];
  carello: Vestito []=[];

  constructor(private http: HttpClient,
    private carelloServie: CarelloService,
     ) {}


  ngOnInit(){
    this.http.get<Categoria[]>('https://fakestoreapi.com/products/categories')
      .subscribe(categorie => {
        this.categorie=categorie;
  
      });
      this.http.get<Vestito[]>('https://fakestoreapi.com/products')
      .subscribe(products => {
        console.log('Prodotti:', products);
        this.vestiti = products.map(vestito=> ({...vestito, mostraDescrizione:false}));
      })
      
    
    }
      aggiungiAlCarrello(prodotto: Vestito): void {
        this['carrelloService'].aggiungiAlCarrello(prodotto);
  }
  rimuoviDalCarrello(prodotto: Vestito): void {
    this['carrelloService'].rimuoviDalCarrello(prodotto);
  }

            mostraDescrizioneVestito(vestito:Vestito):void {
            vestito.mostraDescrizione= !vestito.mostraDescrizione;
            }

      caricaVestiti(categoria: any) {
        this.http.get<Vestito[]>('https://fakestoreapi.com/products/category/' + categoria)
        .subscribe(vestiti => {
          this.vestiti = vestiti;
        })
      
      }

      selezionaCategoria(categoria:string): Categoria[] {
        this.categoriaSelezionata= categoria;
        this.caricaVestiti(this.categoriaSelezionata);
        return this.categorie;
      }

  delete(id: number) {
    fetch('https://fakestoreapi.com/products/' + id, {
      method:"DELETE"
  

  })
      .then(res=> res.json ()) 
      .then(data =>{ 
        this.vestiti = this.vestiti.filter(vestito => vestito.id !== id);
      })
    
  }
}
