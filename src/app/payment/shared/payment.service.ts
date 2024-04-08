import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { Comment } from './comment.model';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient) {}

  public getClientSecret(): Observable<any> {
    return this.http.get('/api/v1/payments');
  }

  public createPayment(priceId: string): Observable<any> {
    return this.http.post('/api/v1/payments/create', { priceId });
  }
}
