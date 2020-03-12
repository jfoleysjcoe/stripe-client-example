import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderRequest } from '../models/orderRequest';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  public api: string = environment.api;

  constructor(private http: HttpClient) {
  }

  paymentRequest(request: OrderRequest[]) {
    return this.http.post<any>(`${this.api}/purchaseorder/payment`, request);
  }
}
