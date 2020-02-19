import { Injectable } from '@angular/core';
import { ICurrency } from 'src/app/shared/models/icurrency';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductConstant } from 'src/app/shared/constants/product-constant';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private _httpClient: HttpClient) { }

  getCurrenciesFromJson(): Observable<ICurrency[]> {
    return this._httpClient.get<ICurrency[]>(ProductConstant.CURRENCY_LOCATION);
  }
}
