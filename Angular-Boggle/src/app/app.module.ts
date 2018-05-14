// Angular
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './material.module';

// Components
import { AppComponent } from './app.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { BoggleComponent } from './boggle/boggle.component';
import { BoggleItemComponent } from './boggle/boggleItem/boggleItem.component';
import { TimerComponent } from './timer/timer.component';
import { SimpleDialogComponent, EndGameDialogComponent, NewGameDialogComponent } from './dialog';

@NgModule({
  declarations: [
    AppComponent,
    BoggleComponent,
    BoggleItemComponent,
    TimerComponent,
    SimpleDialogComponent,
    EndGameDialogComponent,
    NewGameDialogComponent,
    HighscoreComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {path: '', component: BoggleComponent},
        {path: 'highscore', component: HighscoreComponent}
      ], {enableTracing: false}
    )
  ],
  entryComponents: [
    SimpleDialogComponent,
    EndGameDialogComponent,
    NewGameDialogComponent
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
