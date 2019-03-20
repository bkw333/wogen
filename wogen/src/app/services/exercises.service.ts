import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  constructor(private client: HttpClient) {}

  public get(): Observable<any> {
    const url = 'https://localhost:5001/api/exercises';
    return this.client.get<Array<any>>(url);
  }

  public post(exercise: Exercise): Observable<any> {
    const url = 'https://localhost:5001/api/exercises';
    console.log('sending Exercise to api/db', exercise.name, exercise.type);
    return this.client.post(url, exercise);

  }

}
