import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prompt } from './prompt.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PromptService {
  constructor(private http: HttpClient) {}

  public getPromptById(promptId: string): Observable<any> {
    return this.http.get('/api/v1/prompts/' + promptId);
  }

  public getPrompts(
    keywords: any,
    pageIndex: number,
    pageSize: number
  ): Observable<any> {
    return this.http.post(
      `/api/v1/prompts?page=${pageIndex}&limit=${pageSize}`,
      keywords
    );
  }

  public createPrompt(promptData: Prompt): Observable<any> {
    return this.http.post('/api/v1/prompts/create', promptData);
  }

  public deletePrompt(promptId: string): Observable<any> {
    return this.http.delete('/api/v1/prompts/' + promptId);
  }

  public updatePrompt(promptId: string, promptData: Prompt): Observable<any> {
    return this.http.patch('/api/v1/prompts/' + promptId, promptData);
  }

  public getOwnerPrompts(pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(
      `/api/v1/prompts/manage?page=${pageIndex}&limit=${pageSize}`
    );
  }

  public getUserfavoritePrompts(): Observable<any> {
    return this.http.get('/api/v1/prompts/favourite');
  }

  public toggleFavourite(promptId: string): Observable<any> {
    return this.http.get('/api/v1/prompts/favourite/' + promptId);
  }
}
