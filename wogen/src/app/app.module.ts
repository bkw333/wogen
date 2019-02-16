import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { MatInputModule, MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    AddExerciseComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
