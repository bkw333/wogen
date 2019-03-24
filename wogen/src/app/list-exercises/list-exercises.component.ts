import { SignalRService } from './../services/signalR.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Exercise } from '../exercise';
import { ExerciseService } from '../services/exercises.service';
import { Observable } from 'rxjs';
import { delay } from 'q';
import { MatSnackBar } from '@angular/material';

export interface TrainingsType {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-list-exercises',
  templateUrl: './list-exercises.component.html',
  styleUrls: ['./list-exercises.component.css']
})
export class ListExercisesComponent implements OnInit {
  canSendMessage: boolean;
  lastCreatedExercise: Exercise;
  trainingstype = "EMOM";

  constructor(
    private exerciseService: ExerciseService,
    private signalRService: SignalRService,
    private ngZone: NgZone,
    private snackBar: MatSnackBar) {
    this.subscribeToEvents();
  }

  exercises: Array<any>;

  ngOnInit() {
    this.loadExercises();
  }

  loadExercises(): void {
    console.log(this.trainingstype)
    this.exerciseService.get(this.trainingstype).subscribe(data => {
      this.exercises = data;
      console.log(data);
    });
  }

  createExercise(name: string, area: number, beginner: number, advanced: number, extreme: number, equipment: number) {
    const ex = new Exercise;
    ex.name = name;
    ex.area = area;
    ex.beginner = beginner;
    ex.advanced = advanced;
    ex.extreme = extreme;
    ex.equipment = equipment;
    this.exerciseService.post(this.trainingstype, ex).subscribe();
  }

  updateExercise(exercise: Exercise): void {
    this.exerciseService.update(this.trainingstype, exercise.id);
  }

  deleteExercise(exercise: Exercise): void {
    this.exerciseService.delete(this.trainingstype, exercise.id);
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
