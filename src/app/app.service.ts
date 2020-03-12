import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderRequest } from './models/orderRequest';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public api: string = environment.api;

  constructor(private http: HttpClient) {
  }

  initSession(request: OrderRequest[]) {
    return this.http.post<any>(`${this.api}/purchaseorder/newSession`, request);
  }

  getPaymentResult(sessionId: string) {
    return this.http.get<any>(`${this.api}/purchaseorder/bySession/${sessionId}`);
  }
}
