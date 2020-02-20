import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/iproduct';
import { ICurrency } from 'src/app/shared/models/icurrency';
import { ProductService } from 'src/app/services/product-service/product-service.service';
import { CurrencyExchangeService } from 'src/app/services/currency-exchange/currency-exchange.service';
import { CheckNullOrUndefinedService } from 'src/app/shared/util/check-null-or-undefined/check-null-or-undefined.service';
import { CurrencyService } from 'src/app/services/currency/currency.service';
import { error } from 'util';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
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
    this ._productService.getProductInfoFromJson().subscribe((data: IProduct[]) => {
      if (!this ._checkNullOrUndefinedService.isNullOrUndefined(data)) {
        this .products = data;
      }
    });

    this .currencyExchange();

    this ._currencyService.getCurrenciesFromJson().subscribe( (currencies: ICurrency[]) => {
      if (!this ._checkNullOrUndefinedService.isNullOrUndefined(currencies)) {
        this .currencyOptions = currencies['currencies'];
      }
    });
  }

  private currencyExchange() {
    return new Promise((resolve, reject) => {
      this ._currencyExchangeService.getCurrencyExchageRate(this .currencyToBeExchangedIn).subscribe(data => {
        if (this ._checkNullOrUndefinedService.isNullOrUndefined(data)) {
          reject(error);
        }
        else {
          this .currencyRates = data['rates'];
          resolve(data);
        }
      });
    });
  }

  convertToCurrency(currency: string) {
    this .currencyExchange().then(data => {
      this .currencyToBeExchangedIn = currency;
      this .products.forEach((product: IProduct) => {
        product.price = product.price * this .currencyRates[this .currencyToBeExchangedIn];
      });
    });

  }

  trackByProductId(index: number, product: IProduct) {
    return product.id;
  }
}
