export class EndgameDialogModel {
  public score: number;
  public newGame: Function;

  public constructor(score: number, newGame: Function) {
    this.score = score;
    this.newGame = newGame;
  }
}
