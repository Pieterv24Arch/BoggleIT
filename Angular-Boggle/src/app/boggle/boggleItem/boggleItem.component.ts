import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-boggle-item',
  templateUrl: './boggleItem.component.html',
  styleUrls: ['./boggleItem.component.scss']
})
export class BoggleItemComponent {
  @Input() ItemId: number;
}
