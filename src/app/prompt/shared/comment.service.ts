import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Comment } from "./comment.model";

@Injectable()
export class CommentService {
  constructor(private http: HttpClient) {}

  // public getPromptById(promptId: string): Observable<any> {
  //   return this.http.get("/api/v1/prompts/" + promptId);
  // }

  public postComment(commentData: Comment): Observable<any> {
    return this.http.post("/api/v1/comments", commentData);
  }

  public editPrompt(commentId: string, commentData: Comment): Observable<any> {
    return this.http.patch("/api/v1/comments/" + commentId, commentData);
  }
}
