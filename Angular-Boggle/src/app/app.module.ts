// Angular
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';

// Components
import { AppComponent } from './app.component';
import { BoggleComponent } from './boggle/boggle.component';
import { BoggleItemComponent } from './boggle/boggleItem/boggleItem.component';

@NgModule({
  declarations: [
    AppComponent,
    BoggleComponent,
    BoggleItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
