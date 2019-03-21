import { SignalRService } from './services/signalR.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatInputModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ListExercisesComponent } from './list-exercises/list-exercises.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    ListExercisesComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [ SignalRService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
