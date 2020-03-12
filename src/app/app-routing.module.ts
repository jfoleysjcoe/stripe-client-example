import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', redirectTo: '/checkout', pathMatch: 'full' },
  { path: 'checkout', component: CheckoutComponent, pathMatch: 'full'},
  { path: 'result', component: ResultComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
