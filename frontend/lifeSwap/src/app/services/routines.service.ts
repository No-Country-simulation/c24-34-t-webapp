import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateRoutineDTO, Routine } from '../models/routine';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RoutinesService {
  constructor(private http: HttpClient) {}

  create(routine: CreateRoutineDTO) {
    return this.http.post<Routine>(`${environment.url}routines`, routine);
  }
}
