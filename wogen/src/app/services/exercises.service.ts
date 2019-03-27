import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Exercise } from '../exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  public exercises = Array<any>();


  constructor(private client: HttpClient) { }
  url = 'https://localhost:5001/api/exercises';

  public get(): Observable<any> {
    return this.client.get<Array<any>>(this.url);
  }

  public post(exercise: Exercise): Observable<any> {
    this.exercises.push(exercise);
    return this.client.post(this.url, exercise);
  }

  public delete(id: string): void {
    const url = `${this.url}/?id=${id}`;
    this.client.delete(url).subscribe(data => { });
  }

  public update(id: string): any {
    console.log(`updating ${id}`);
  }

}
