import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EndgameDialogModel } from '../../models/EndgameDialogModel';
import { BoggleService } from '../../services/boggle.service';

@Component({
  selector: 'app-endgame-dialog',
  templateUrl: './endgameDialog.component.html',
  styleUrls: ['./endgameDialog.component.scss']
})
export class EndGameDialogComponent {
  public constructor(
    @Inject(MAT_DIALOG_DATA)public data: EndgameDialogModel,
    private dialogRef: MatDialogRef<EndGameDialogComponent>) {

  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
