import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

import { StringHelper as str } from '../helpers/StringHelper';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnChanges {
  @Input() private running: boolean = true;
  @Input() private startTime: number = Date.now();
  @Input() private countDownFrom: number;
  @Output() private timerDone: EventEmitter<any> = new EventEmitter();

  private interval: any;

  public timeText: string = '00:00:00';

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.startTime) {
      this.running = true;
    }
    if (this.interval !== undefined) {
      this.updateInterVal();
    } else {
      window.clearInterval(this.interval);
      this.interval = undefined;
      this.updateInterVal();
    }
  }

  private updateInterVal(): void {
    if (this.running && this.startTime) {
      this.interval = window.setInterval(() => {
        this.updateTimer(this.countDownFrom !== undefined);
      }, 10);
    } else {
      window.clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  private updateTimer(countDown: boolean): void {
    if (countDown) {
      const timeLeft = this.countDownFrom - (Date.now() - this.startTime);
      if (timeLeft > 0) {
        this.timeText = this.calculateTimerString(timeLeft);
      } else {
        this.running = false;
        this.timerDone.emit(null);
        window.clearInterval(this.interval);
        this.interval = undefined;
      }
    } else {
      const timeElapsed = Date.now() - this.startTime;
      this.timeText = this.calculateTimerString(timeElapsed);
    }
  }

  private calculateTimerString(time: number): string {
    if (time > 0) {
      let TimeString = '';

      // Remove hours
      time = time % 3600000;
      // Calculate minutes elapsed
      const minutes = Math.floor(time / 60000);
      time = time % 60000;

      // Calculate seconds elapsed
      const seconds = Math.floor(time / 1000);
      time = time % 1000;

      // Calculate 100th seconds
      const hundreds = Math.floor(time / 10);
      TimeString = str.pad(minutes, 2) + ':' + str.pad(seconds, 2) + ':' + str.pad(hundreds, 2);
      return TimeString;
    }

    return '00:00:00';
  }
}
