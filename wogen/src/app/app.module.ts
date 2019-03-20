import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ListExercisesComponent } from './list-exercises/list-exercises.component';


@NgModule({
  declarations: [
    AppComponent,
    AddExerciseComponent,
    ListExercisesComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
