export enum displayState {
  Selected,
  Valid,
  Invalid,
  None
}

export class BoardState {
  public display: Array<displayState> = [
    displayState.None,
    displayState.None,
    displayState.None,
    displayState.None,
    displayState.None,
    displayState.None,
    displayState.None,
    displayState.None,
    displayState.None,
    displayState.None,
    displayState.None,
    displayState.None,
    displayState.None,
    displayState.None,
    displayState.None,
    displayState.None
  ];
  public letters: Array<string> = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ];
}
