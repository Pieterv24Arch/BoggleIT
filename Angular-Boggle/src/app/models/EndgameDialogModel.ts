export class EndgameDialogModel {
  public score: number;
  public newGame: Function;
  public boardId: string;

  public constructor(boardId: string, score: number, newGame: Function) {
    this.score = score;
    this.newGame = newGame;
    this.boardId = boardId;
  }
}
