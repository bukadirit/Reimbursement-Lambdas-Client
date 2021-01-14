import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reimbursement } from '../models/reimbursement';

@Injectable({
  providedIn: 'root',
})
export class ReimbursementService {
  private baseUrl: string =
    'https://c0g0w5uhlk.execute-api.us-east-2.amazonaws.com/dev';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Reimbursement[]>(`${this.baseUrl}/reimbursements`);
  }

  postReimbursement(reimb: Reimbursement) {
    return this.http.post(
      `${this.baseUrl}/reimbursements`,
      JSON.stringify(reimb)
    );
  }

  updateReimbursement(id: number, data: any) {
    return this.http.post(
      `${this.baseUrl}/reimbursements/update/${id}`,
      JSON.stringify(data)
    );
  }
}
