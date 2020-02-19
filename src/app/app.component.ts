import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product-service/product-service.service';
import { IProduct } from './shared/models/iproduct';
import { CurrencyExchangeService } from './services/currency-exchange/currency-exchange.service';
import { CheckNullOrUndefinedService } from './shared/util/check-null-or-undefined/check-null-or-undefined.service';
import { error } from '@angular/compiler/src/util';
import { CurrencyService } from './services/currency/currency.service';
import { ICurrency } from './shared/models/icurrency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DonatekartProductAssignment';

  products: IProduct[] = [];
  currencyRates: Object[] = [];
  currencyOptions: ICurrency[];
  currencyToBeExchangedIn: string = 'INR';

  constructor(private _productService: ProductService,
    private _currencyExchangeService: CurrencyExchangeService,
    private _checkNullOrUndefinedService: CheckNullOrUndefinedService,
    private _currencyService: CurrencyService) { }

  ngOnInit(): void {
    this._productService.getProductInfoFromJson().subscribe((data: IProduct[]) => {
      if (!this._checkNullOrUndefinedService.isNullOrUndefined(data)) {
        this.products = data;
      }
    });

    this.currencyExchange();

    this._currencyService.getCurrenciesFromJson().subscribe( (currencies: ICurrency[]) => {
      if (!this._checkNullOrUndefinedService.isNullOrUndefined(currencies)) {
        this.currencyOptions = currencies['currencies'];
      }
    });
  }

  private currencyExchange() {
    return new Promise((resolve, reject) => {
      this._currencyExchangeService.getCurrencyExchageRate(this.currencyToBeExchangedIn).subscribe(data => {
        if (this._checkNullOrUndefinedService.isNullOrUndefined(data)) {
          reject(error);
        }
        else {
          this.currencyRates = data['rates'];
          resolve(data);
        }
      });
    });
  }

  convertToCurrency(currency: string) {
    this.currencyExchange().then(data => {
      this.currencyToBeExchangedIn = currency;
      this.products.forEach((product: IProduct) => {
        product.price = product.price * this.currencyRates[this.currencyToBeExchangedIn];
      });
    });

  }

  trackByProductId(index: number, product: IProduct) {
    return product.id;
  }
}
