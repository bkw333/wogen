import { SignalRService } from './services/signalR.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// tslint:disable-next-line:max-line-length
import { MatInputModule, MatButtonModule, MatSnackBarModule, MatTooltipModule, MatProgressBarModule, MatPaginatorModule, MatBadgeModule, MatDatepickerModule, MatNativeDateModule, MatCardModule, MatToolbarModule, MatIconModule, MatSelectModule, MatCheckboxModule, MatTableModule, MatAutocompleteModule, MatChipsModule, MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ListExercisesComponent } from './list-exercises/list-exercises.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    ListExercisesComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDialogModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatDialogModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTooltipModule
  ],
  providers: [ SignalRService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
