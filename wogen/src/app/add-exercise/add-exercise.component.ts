import { ExerciseService } from './../services/exercises.service';
import { Exercise } from './../exercise';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
  }

  createExercise(name: string, area: number, emom: number, amrap: number, strength: number, type: number) {
    const ex = new Exercise;

    ex.name = name;
    ex.area = area;
    ex.emom = emom;
    ex.amrap = amrap;
    ex.strength = strength;
    ex.type = type;

    //service to post exercise to database
    console.log(ex.name, ex.area, ex.emom, ex.amrap, ex.strength, ex.type);
    this.exerciseService.post(ex);
  }

}
