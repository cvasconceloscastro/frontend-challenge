import { Injectable } from '@angular/core';
import { DataItem } from '../models/data-item.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockServiceService {
  private apiUrl = 'assets/mock-data.json';

  constructor(private http: HttpClient) {}

  getItems(): Observable<DataItem[]> {
    return this.http.get<DataItem[]>(this.apiUrl);
  }
}
