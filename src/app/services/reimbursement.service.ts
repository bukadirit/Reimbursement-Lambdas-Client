import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReimbursementService {
  constructor(private http: HttpClient) {}

  postReimbursementWithNoReceipt(a) {
    return new Observable();
  }

  postReimbursement(a, b) {
    return new Observable();
  }
}
