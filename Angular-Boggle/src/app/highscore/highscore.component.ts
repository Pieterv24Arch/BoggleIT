import { Component, OnInit } from '@angular/core';
import { HighScoreService } from '../services/highscore.service';
import { Highscore } from '../models/Highscore';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-highscores',
  templateUrl: 'highscore.component.html',
  styleUrls: ['highscore.component.scss']
})
export class HighscoreComponent implements OnInit {
  public highScores: Array<Highscore> = [];

  public constructor(private highScoreService: HighScoreService) {
  }

  public ngOnInit(): void {
    this.highScoreService.getHighscores().subscribe((result: Array<Highscore>) => {
      this.highScores = result;
      console.log(this.highScores);
    }, (error: HttpErrorResponse) => {
      console.log(error.error);
    });
  }
}
