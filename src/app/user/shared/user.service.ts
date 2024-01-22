import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  public getUserById(userId: any): Observable<any> {
    return this.http.get('/api/v1/users/' + userId);
  }

  public updateUser(userId: any, userData: any): Observable<any> {
    return this.http.patch('/api/v1/users/' + userId, userData);
  }

  //   public getUserFavouritePosts(): Observable<any> {
  //     return this.http.get('/api/v1/posts/favourite');
  //   }

  //   public toggleFavourite(postId: string): Observable<any> {
  //     return this.http.get('/api/v1/posts/favourite/' + postId);
  //   }
}
