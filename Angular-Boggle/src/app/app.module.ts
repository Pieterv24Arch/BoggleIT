// Angular
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './material.module';

// Components
import { AppComponent } from './app.component';
import { BoggleComponent } from './boggle/boggle.component';
import { BoggleItemComponent } from './boggle/boggleItem/boggleItem.component';
import { TimerComponent } from './timer/timer.component';
import { SimpleDialogComponent, EndGameDialogComponent } from './dialog';

@NgModule({
  declarations: [
    AppComponent,
    BoggleComponent,
    BoggleItemComponent,
    TimerComponent,
    SimpleDialogComponent,
    EndGameDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule.forRoot(
      [{path: '', component: AppComponent}]
    )
  ],
  entryComponents: [
    SimpleDialogComponent,
    EndGameDialogComponent
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
