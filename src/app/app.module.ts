import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ApiService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
