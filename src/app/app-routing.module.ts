import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './componenti/homepage/homepage.component';
import { CartComponent } from './componenti/cart/cart.component';
const routes: Routes = [
  { path: '', redirectTo: 'Homepage', pathMatch: 'full' },
  { path: 'Homepage', component: HomepageComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
