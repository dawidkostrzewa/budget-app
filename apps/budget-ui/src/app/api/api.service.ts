import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BudgetResponse } from '@budgetapp/shared/budget-models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  API_URL = 'http://localhost:3333/api';

  fetchBudget() {
    return this.http.get<BudgetResponse>(`${this.API_URL}/budget`);
  }
}
