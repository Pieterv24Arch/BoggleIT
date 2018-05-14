import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EndgameDialogModel } from '../../models/EndgameDialogModel';
import { BoggleService } from '../../services/boggle.service';
import { HighScoreService } from '../../services/highscore.service';
import { Highscore } from '../../models/Highscore';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-endgame-dialog',
  templateUrl: './endgameDialog.component.html',
  styleUrls: ['./endgameDialog.component.scss']
})
export class EndGameDialogComponent {
  public Name: string = 'Wade Wilson';
  public Added: boolean = false;

  public constructor(
    @Inject(MAT_DIALOG_DATA)public data: EndgameDialogModel,
    private dialogRef: MatDialogRef<EndGameDialogComponent>,
    private highScoreService: HighScoreService) {

  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public sendHighScrore(): void {
    if (this.data.score > 0) {
      console.log('hello there');
      this.highScoreService.postHighscore(this.data.boardId, new Highscore(this.Name, this.data.score)).subscribe((result: Highscore) => {
        console.log('success');
        this.Added = true;
        console.log(result);
      }, (error: HttpErrorResponse) => {
        console.log('error');
        console.log(error);
        console.log(error.error);
      });
    }
  }
}
