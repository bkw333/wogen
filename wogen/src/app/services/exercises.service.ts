import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  public exercises = Array<any>();

  constructor(private client: HttpClient) { }
  url = 'https://localhost:5001/api/exercises';

  public get(type: string): Observable<any> {
    return this.client.get<Array<any>>(this.url, type);
  }

  public post(type: string, exercise: Exercise): Observable<any> {
    this.exercises.push(type, exercise);
    return this.client.post(this.url, type, exercise);
  }

  public delete(type: string, id: string): void {
    const url = `${this.url}/?type=${type}&id=${id}`;
    this.client.delete(url).subscribe(data => {});
  }

  public update(type: string, id: string): any {
    console.log(`updating ${type}: ${id}`);
  }

}
