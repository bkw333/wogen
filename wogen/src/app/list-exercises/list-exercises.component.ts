import { SignalRService } from './../services/signalR.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Exercise } from '../exercise';
import { ExerciseService } from '../services/exercises.service';
import { Observable } from 'rxjs';
import { delay } from 'q';
import { MatSnackBar, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-list-exercises',
  templateUrl: './list-exercises.component.html',
  styleUrls: ['./list-exercises.component.css']
})
export class ListExercisesComponent implements OnInit {
  canSendMessage: boolean;
  lastCreatedExercise: Exercise;
  displayedColumns: string[] = ['Type', 'Name', 'Area', 'Easy', 'Medium', 'Extreme', 'Equipment'];

  constructor(
    private exerciseService: ExerciseService,
    private signalRService: SignalRService,
    private ngZone: NgZone,
    private snackBar: MatSnackBar) {
    this.subscribeToEvents();
  }

  exercises: Array<any>;
  randomWorkout: any;
  exercisesList = new MatTableDataSource([]);

  ngOnInit() {
    this.loadExercises();
  }

  loadExercises(): void {
    this.exerciseService.get().subscribe(data => {
      this.exercises = data;
    });
  }

  createExercise(type: string, name: string, area: number, easy: number, medium: number, extreme: number, equipment: number) {
    const ex = new Exercise;
    ex.type = type;
    ex.name = name;
    ex.area = area;
    ex.easy = easy;
    ex.medium = medium;
    ex.extreme = extreme;
    ex.equipment = equipment;
    this.exerciseService.post(ex).subscribe(x => {
      this.exercisesList = this.exerciseService.exercisesList;
    });
  }

  GetWorkout(type: number) {
    if (!type) {
      type = 1;
    }
    type = +type;
    const time = 20;
    const rounds = 4;
    const filteredExercises = this.GetFilteredExercises(type);
    this.randomWorkout = this.GenerateWorkout(time, rounds, filteredExercises);

  }

  GenerateWorkout(time: number, rounds: number, filteredExercises: Array<Exercise>): Array<Exercise> {
    const workout = Array<Exercise>();
    const exercises = time / rounds;
    for (let i = 0; i < exercises - 1; i++) {
      const x = Math.floor(Math.random() * filteredExercises.length + 0);
      workout.push(filteredExercises[x]);
    }
    return workout;
  }

  GetFilteredExercises(type: number): any {
    return this.exercises.filter(x => x.type === type);
  }

  updateExercise(exercise: Exercise): void {
    this.exerciseService.update(exercise.id);
  }

  deleteExercise(exercise: Exercise): void {
    this.exerciseService.delete(exercise.id);
    const index = this.exercises.indexOf(exercise);
    this.exercises.splice(index, 1);
  }
  subscribeToEvents(): any {
    this.signalRService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });

    this.signalRService.postReceived.subscribe((response: any) => {
      this.ngZone.run(() => {
        const signalrMessage = response.ResponseText.toString();
        this.snackBar.open(signalrMessage, 'OK!', {
          duration: 5000
        });
        this.lastCreatedExercise = response;
        if (response.status === 'created') {
          this.exercises.push(this.lastCreatedExercise);
          console.log(signalrMessage);
        }
        if (response.status === 'updated') {
          console.log(signalrMessage);
        }
        if (response.status === 'deleted') {
          console.log(signalrMessage);
        }
        if (response.status === 'notFound') {
          console.log(signalrMessage);
        }
      });
    });
  }
}
