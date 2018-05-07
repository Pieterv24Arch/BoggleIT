import { Component, Input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-boggle-item',
  templateUrl: './boggleItem.component.html',
  styleUrls: ['./boggleItem.component.scss']
})
export class BoggleItemComponent {
  @Input() ItemId: number;
  @Input() Letter: string;

  public valid: boolean;
  public selected: boolean;
  public invalid: boolean;

  public constructor() {
    this.valid = false;
    this.selected = false;
    this.invalid = false;
  }

  public handleClick() {
    console.log('howdy');
    this.selected = !this.selected;
  }
}
