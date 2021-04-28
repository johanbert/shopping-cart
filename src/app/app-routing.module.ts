import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {path: 'register' , component: RegisterComponent},
  {path: 'login'    , component: LoginComponent},
  {path: 'products' , component: ProductsComponent},
  {path: 'cart'     , component: CartComponent, canActivate: [AuthGuard]},
  {path: 'checkout' , component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo:'products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
