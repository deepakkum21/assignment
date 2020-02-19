import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductConstant } from 'src/app/shared/constants/product-constant';
import { Observable } from 'rxjs';
import { HandleErrorService } from '../handle-error/handle-error.service';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {

  constructor(private _httpClient: HttpClient, private _errorResponse: HandleErrorService) { }

  getCurrencyExchageRate(base: string): Observable<any> {
    return this._httpClient.get<any>(ProductConstant.CURRENCY_EXCHANGEAPI + base).pipe(
      catchError(this._errorResponse.handleError)
    );
  }
}
