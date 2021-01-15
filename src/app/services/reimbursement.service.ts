import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reimbursement } from '../models/reimbursement';

@Injectable({
  providedIn: 'root',
})
export class ReimbursementService {
  private baseUrl: string =
    'https://54j89irrs0.execute-api.us-east-2.amazonaws.com/dev/reimbursements/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getForOne(id: string) {
    return this.http.get<Reimbursement[]>(`${this.baseUrl}author/${id}`);
  }

  getAll() {
    return this.http.get<Reimbursement[]>(this.baseUrl);
  }

  postReimbursement(reimb: Reimbursement) {
    return this.http.post(this.baseUrl, JSON.stringify(reimb));
  }

  postReimbursementImage(data: any, id: string) {
    return this.http.post(`${this.baseUrl}image/${id}`, JSON.stringify(data));
  }

  updateReimbursement(id: number, data: any) {
    return this.http.post(`${this.baseUrl}update/${id}`, JSON.stringify(data));
  }
}
