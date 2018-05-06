import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-boggle',
  templateUrl: './boggle.component.html',
  styleUrls: ['./boggle.component.scss']
})
export class BoggleComponent {
  private title = 'Boggle';

  public constructor(TitleService: Title) {
    TitleService.setTitle(this.title);
  }
}
