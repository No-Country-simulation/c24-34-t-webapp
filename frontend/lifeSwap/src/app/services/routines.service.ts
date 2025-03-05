import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateRoutineDTO, Routine } from '../models/routine';
import { environment } from '../../environments/environment.development';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class RoutinesService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  create(routine: CreateRoutineDTO) {
    const token = this.tokenService.getToken();
    return this.http.post<Routine>(`${environment.url}routines`, routine, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  //get a random routine by a subcategory and keyword(description or title)
  getRandomRoutine(subCategory: string, category: string, keyWord: string) {
    const token = this.tokenService.getToken();
    return this.http.get<Routine>(
      `${environment.url}routines/random?subcategory=${subCategory}&category=${category}&keyword=${keyWord}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
