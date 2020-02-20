import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductService } from './services/product-service/product-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyExchangeService } from './services/currency-exchange/currency-exchange.service';
import { FormsModule } from '@angular/forms'
import { CheckNullOrUndefinedService } from './shared/util/check-null-or-undefined/check-null-or-undefined.service';
import { HandleErrorService } from './services/handle-error/handle-error.service';
import { CurrencyService } from './services/currency/currency.service';
import { ProductComponent } from './component/product/product.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';

@ NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ProductService, CurrencyExchangeService, CheckNullOrUndefinedService, HandleErrorService, CurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
