import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { Comment } from './comment.model';

@Injectable()
export class PaymentService {
  constructor(private http: HttpClient) {}

  public createSubscription(
    priceId: string,
    billingCycle: number
  ): Observable<any> {
    return this.http.post('/api/v1/payments/create', { priceId, billingCycle });
  }

  public confirmSubscription(payment_intent: string): Observable<any> {
    return this.http.patch('/api/v1/payments/confirm', {
      payment_intent,
    });
  }

  public updateSubscription(
    priceId: string,
    billingCycle: number
  ): Observable<any> {
    return this.http.patch('/api/v1/payments/update', {
      priceId,
      billingCycle,
    });
  }

  public cancelSubscription(): Observable<any> {
    return this.http.get('/api/v1/payments/cancel');
  }
}
