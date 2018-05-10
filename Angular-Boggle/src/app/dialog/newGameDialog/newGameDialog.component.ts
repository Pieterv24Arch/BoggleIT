import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DialogModel } from '../../models/DialogModel';

@Component({
  selector: 'app-newgame-dialog',
  templateUrl: './newGameDialog.component.html',
  styleUrls: ['./newGameDialog.component.scss']
})
export class NewGameDialogComponent {
  public constructor(private dialogRef: MatDialogRef<NewGameDialogComponent>) {

  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
