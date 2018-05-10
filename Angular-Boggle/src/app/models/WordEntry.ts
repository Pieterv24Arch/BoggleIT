export class WordEntry {
  public word: string;
  public letterOrder: Array<number>;

  public constructor(word: string, letterOrder: Array<number>) {
    this.word = word;
    this.letterOrder = letterOrder;
  }
}
