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

  //get a random routine by a subcategory and keyword(description or title)
  getRandomRoutine(subCategory: string, category:string, keyWord: string) {
    if (subCategory !== '') {
      return this.http.get<Routine>(`${environment.url}routines/random?subcategory=${subCategory}`);
    }
    else if(category !== '') {
      return this.http.get<Routine>(`${environment.url}routines/random?category=${category}`);
    }else{
      return this.http.get<Routine>(`${environment.url}routines/random?keyword=${keyWord}`);
    }
  }

  getRoutines() {
    return this.http.get<Routine[]>(`${environment.url}routines`);
  }
}
