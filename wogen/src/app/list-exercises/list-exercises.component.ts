import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise';
import { ExerciseService } from '../services/exercises.service';
import { Observable } from 'rxjs';
import { delay } from 'q';

@Component({
  selector: 'app-list-exercises',
  templateUrl: './list-exercises.component.html',
  styleUrls: ['./list-exercises.component.css']
})
export class ListExercisesComponent implements OnInit {


  constructor(private exerciseService: ExerciseService) { }

  exercises: Array<any>;

  ngOnInit() {
    this.loadExercises();
  }

  loadExercises(): void {
    this.exerciseService.get().subscribe(data => {
      this.exercises = data;
      console.log(data);
    });
  }

  createExercise(name: string, area: number, emom: number, amrap: number, strength: number, type: number) {
    const ex = new Exercise;

    ex.name = name;
    ex.area = area;
    ex.emom = emom;
    ex.amrap = amrap;
    ex.strength = strength;
    ex.type = type;

    console.log(ex.name, ex.area, ex.emom, ex.amrap, ex.strength, ex.type);
    this.exerciseService.post(ex).subscribe();
    this.exercises.push(ex);
  }

  updateExercise(exercise: Exercise): void {
    this.exerciseService.update(exercise.id);
  }

  deleteExercise(exercise: Exercise): void {
    this.exerciseService.delete(exercise.id);
    console.log(` exercises: ${this.exercises}`);
    const index = this.exercises.indexOf(exercise);
    this.exercises.splice(index, 1);

  }
}
