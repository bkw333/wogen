import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise';
import { ExerciseService } from '../services/exercises.service';

@Component({
  selector: 'app-list-exercises',
  templateUrl: './list-exercises.component.html',
  styleUrls: ['./list-exercises.component.css']
})
export class ListExercisesComponent implements OnInit {


  constructor(private exerciseService: ExerciseService) { }

  exercises: Array<any>;

  ngOnInit() {
    this.exerciseService.get().subscribe(data => {
      this.exercises = data;
      console.log(data);
    });
  }
}
