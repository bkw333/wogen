import { SignalRService } from './../services/signalR.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Exercise } from '../exercise';
import { ExerciseService } from '../services/exercises.service';
import { Observable } from 'rxjs';
import { delay } from 'q';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-exercises',
  templateUrl: './list-exercises.component.html',
  styleUrls: ['./list-exercises.component.css']
})
export class ListExercisesComponent implements OnInit {
  canSendMessage: boolean;
  lastCreatedExercise: Exercise;

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
    this.exerciseService.get().subscribe(data => {
      this.exercises = data;
      console.log(data);
    });
  }

  createExercise(name: string, area: number, intensity: number, emom: number, amrap: number, strength: number, type: number) {
    const ex = new Exercise;
    ex.name = name;
    ex.area = area;
    ex.intensity = intensity;
    ex.emom = emom;
    ex.amrap = amrap;
    ex.strength = strength;
    ex.type = type;
    this.exerciseService.post(ex).subscribe();
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
