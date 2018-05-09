import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public run: boolean = false;

  public toggleRun(): void {
    this.run = !this.run;
  }
}
