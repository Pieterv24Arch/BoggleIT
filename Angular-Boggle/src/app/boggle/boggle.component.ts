import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UpperCasePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDrawer, MatDialog } from '@angular/material';

import { displayState, BoardState } from '../models/Boardstate';
import { BoardHelper } from '../helpers/BoardHelper';

import { BoggleService } from '../services/boggle.service';
import { Board } from '../models/Board';
import { WordEntry } from '../models/WordEntry';
import { DialogModel } from '../models/DialogModel';
import { HttpErrorResponse } from '@angular/common/http';
import { EndGameDialogComponent, SimpleDialogComponent, NewGameDialogComponent } from '../dialog';
import { EndgameDialogModel } from '../models/EndgameDialogModel';

@Component({
  selector: 'app-boggle',
  templateUrl: './boggle.component.html',
  styleUrls: ['./boggle.component.scss']
})
export class BoggleComponent implements OnInit {
  private title: string = 'Boggle';
  public board: BoardState = new BoardState();
  public word: string = '';
  private playBoard: Board = new Board();

  private selectedOrder: Array<number> = [];
  private lastItemId: number = -1;
  public words: Array<WordEntry> = [];

  public constructor(
    TitleService: Title,
    private boggleService: BoggleService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    TitleService.setTitle(this.title);
  }

  public ngOnInit(): void {
    // if (this.route.queryParams['id'] === undefined) {
    //   console.log('create new game');
    //   // this.newGame(null);
    //   const dialog = this.dialog.open(NewGameDialogComponent);

    //   dialog.afterClosed().subscribe((result: any) => {
    //     if (result === 'yes') {
    //       this.newGame(null);
    //     }
    //   });
    // }
    this.route.queryParams.subscribe((params: Array<object>) => {
      console.log(params['id']);
      if (params['id']) {
        this.boggleService.getBoardById(params['id']).subscribe((board: Board) => {
          this.updateBoard(board);
        });
      }
    });
  }

  public handlePlayClick(): void {
    console.log(this.playBoard.timeCreated);
    console.log(Date.now());
    if (this.selectedOrder.length > 0) {
      let wordString = '';
      this.selectedOrder.forEach((element: number) => {
        wordString += this.board.letters[element];
      });
      const word = new WordEntry(wordString, this.selectedOrder);
      this.boggleService.postWord(this.playBoard.stateId, word).subscribe((e: any) => {
        console.log(e);
        this.updateWordList();
      }, (error: HttpErrorResponse) => {
        this.dialog.open(SimpleDialogComponent, {
          data: new DialogModel('Error', error.error)
        });
        console.log(error);
      });
    }
  }

  public updateWordList(): void {
    this.boggleService.getWords(this.playBoard.stateId).subscribe((result: Array<WordEntry>) => {
      console.log(result);
      this.words = result;
      this.resetBoardDisplayStates();
      this.updatePlayBoard();
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.dialog.open(SimpleDialogComponent, {
        data: new DialogModel('Error', error.error)
      });
    });
  }

  public timerExpired(): void {
    console.log('timer expired');
    this.boggleService.getScore(this.playBoard.stateId).subscribe((result: number) => {
      const dialogRef = this.dialog.open(EndGameDialogComponent, {
        data: new EndgameDialogModel(this.playBoard.stateId, result, this.newGame),
        disableClose: true
      });

      dialogRef.afterClosed().subscribe((result2: any) => {
        if (result2 === 'newGame') {
          this.newGame(null);
        }
      });
    });
  }

  public newGame(menuDrawer: MatDrawer): void {
    this.boggleService.getBoard().subscribe((board: Board) => {
      this.router.navigate([''], {queryParams: {id: board.stateId} });
      if (menuDrawer != null) {
        menuDrawer.close();
      }
    });
  }

  private updateBoard(board: Board): void {
    const newBoard = {...this.board};
    this.playBoard = board;
    newBoard.display = this.board.display.map(() => {
      return displayState.None;
    });
    newBoard.letters = board.board;

    this.board = newBoard;
  }

  public updatePlayBoard(): void {
    this.boggleService.getBoardById(this.playBoard.stateId).subscribe((board: Board) => {
      this.playBoard = board;
    }, (error: HttpErrorResponse) => {
      this.dialog.open(SimpleDialogComponent, {
        data: new DialogModel('Error', error.error)
      });
    });
  }

  public handleItemClick(id: number): void {
    // Make sure id is a number
    id = +id;
    // Create copy of board
    const newBoard: BoardState = {...this.board};
    const currentDisplayState: displayState = this.board.display[id];

    // if item is not yet selected check if if can be selected
    // if it can be selected, also draw valid items as green
    // if it cannot be selected draw selected square red
    // if item is already selected, a check is done if it was the last selected square.
    // if so it'll be deselected.
    if (currentDisplayState !== displayState.Selected) {
      this.resetDisplayStates();
      // Check whether a items was already played before
      if (this.lastItemId !== -1) {
        const validIds: Array<number> = BoardHelper.getNeighbouringItems(this.lastItemId);
        if (validIds.includes(id)) {
          newBoard.display[id] = displayState.Selected;
          this.selectedOrder.push(id);
          this.lastItemId = id;
        } else {
          newBoard.display[id] = displayState.Invalid;
        }
      } else {
        newBoard.display[id] = displayState.Selected;
        this.selectedOrder.push(id);
        this.lastItemId = id;
      }
      if (this.lastItemId !== -1) {
        const validIds = BoardHelper.getNeighbouringItems(this.lastItemId);
        this.markValidSquares(newBoard, validIds);
      }
    } else if (currentDisplayState === displayState.Selected) {
      if (id === this.lastItemId) {
        this.resetDisplayStates();
        newBoard.display[id] = displayState.None;
        this.selectedOrder.pop();
        if (this.selectedOrder.length > 0) {
          this.lastItemId = this.selectedOrder[this.selectedOrder.length - 1];
        } else {
          this.lastItemId = -1;
        }
        if (this.lastItemId !== -1) {
          const validIds = BoardHelper.getNeighbouringItems(this.lastItemId);
          this.markValidSquares(newBoard, validIds);
        }
      }
    }
    this.updateWord();
    this.board = newBoard;
  }

  private updateWord(): void {
    let newWord = '';
    for (let i = 0; i < this.selectedOrder.length; i++) {
      newWord += this.board.letters[this.selectedOrder[i]];
    }
    this.word = newWord;
  }

  private resetDisplayStates(): void {
    for (let i = 0; i < this.board.display.length; i++) {
      if (this.board.display[i] !== displayState.Selected) {
        this.board.display[i] = displayState.None;
      }
    }
  }

  private resetBoardDisplayStates(): void {
    const newBoard = {...this.board};
    this.selectedOrder = [];
    this.lastItemId = -1;
    newBoard.display = this.board.display.map(() => {
      return displayState.None;
    });
    this.board = newBoard;
  }

  private markValidSquares(board: BoardState, validIds: Array<number>): void {
    for (let i = 0; i < validIds.length; i++) {
      if (board.display[validIds[i]] !== displayState.Selected) {
        board.display[validIds[i]] = displayState.Valid;
      }
    }
  }
}
