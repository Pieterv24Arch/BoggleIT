// Angular
import { NgModule } from '@angular/core';

// Modules
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDialogModule
} from '@angular/material';

// Components

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ]
})
export class  AngularMaterialModule { }
