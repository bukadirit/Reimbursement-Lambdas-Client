import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reimbursement } from '../models/reimbursement';

@Injectable({
  providedIn: 'root',
})
export class ReimbursementService {
  private httpOptions: any;
  private token: string = '';
  private baseUrl: string =
    'https://6rbuibbn4d.execute-api.us-east-2.amazonaws.com/prod/reimbursements/';

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.getToken().subscribe((data) => {
      this.token = data;
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.token,
          Accept: '*/*',
        }),
      };
    });
  }

  getForOne(id: string) {
    return this.http.get<Reimbursement[]>(
      `${this.baseUrl}author/${id}`,
      <Object>this.httpOptions
    );
  }

  getAll(): Observable<Reimbursement[]> {
    return this.http.get<Reimbursement[]>(
      this.baseUrl,
      <Object>this.httpOptions //Must add <Object> to the options or it returns an observable of HttpEvent instead of Reimbursement
    );
  }

  postReimbursement(reimb: Reimbursement) {
    return this.http.post(
      this.baseUrl,
      JSON.stringify(reimb),
      <Object>this.httpOptions
    );
  }

  postReimbursementImage(data: any, id: string) {
    return this.http.post(
      `${this.baseUrl}image/${id}`,
      JSON.stringify(data),
      <Object>this.httpOptions
    );
  }

  updateReimbursement(id: number, data: any) {
    return this.http.post(
      `${this.baseUrl}update/${id}`,
      JSON.stringify(data),
      <Object>this.httpOptions
    );
  }
}
