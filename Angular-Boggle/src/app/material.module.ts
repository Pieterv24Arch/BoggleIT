// Angular
import { NgModule } from '@angular/core';

// Modules
import { MatButtonModule, MatToolbarModule } from '@angular/material';

// Components

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule
  ]
})
export class  AngularMaterialModule { }
