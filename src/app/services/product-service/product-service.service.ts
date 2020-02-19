import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IProduct } from 'src/app/shared/models/iproduct';
import { Observable } from 'rxjs';
import { ProductConstant } from 'src/app/shared/constants/product-constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) { }

  getProductInfoFromJson(): Observable<IProduct[]> {
    return this._httpClient.get<IProduct[]>(ProductConstant.PRODUCT_INFO_LOCATION);
  }
}
