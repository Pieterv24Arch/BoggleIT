import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { displayState, BoardState } from '../../models/Boardstate';

@Component({
  selector: 'app-boggle-item',
  templateUrl: './boggleItem.component.html',
  styleUrls: ['./boggleItem.component.scss']
})
export class BoggleItemComponent implements OnInit, OnChanges {
  @Input() private ItemId: number;
  @Input() private Board: BoardState;
  @Output() private selected: EventEmitter<any> = new EventEmitter();

  public isValid: boolean;
  public isSelected: boolean;
  public isInvalid: boolean;
  public Letter: string;

  public ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.ItemId === null || this.ItemId === undefined) {
      throw new Error('ItemId attribute is required');
    }
    this.isValid = this.Board.display[this.ItemId] === displayState.Valid;
    this.isSelected = this.Board.display[this.ItemId] === displayState.Selected;
    this.isInvalid = this.Board.display[this.ItemId] === displayState.Invalid;
    this.Letter = this.Board.letters[this.ItemId];
  }

  public handleClick(): void {
    this.selected.emit(this.ItemId);
  }
}
