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

  public getLatestPrompts(
    pageIndex: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(
      `/api/v1/prompts/latest?page=${pageIndex}&limit=${pageSize}`
    );
  }

  public getPromptRanking(
    pageIndex: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(
      `/api/v1/prompts/ranking?page=${pageIndex}&limit=${pageSize}`
    );
  }

  public getPrompts(
    keywords: any,
    pageIndex: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(
      `/api/v1/prompts?keywords=${keywords}&page=${pageIndex}&limit=${pageSize}`
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
}
