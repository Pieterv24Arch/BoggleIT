import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogModel } from '../../models/DialogModel';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simpleDialog.component.html',
  styleUrls: ['./simpleDialog.component.scss']
})
export class SimpleDialogComponent {
  public constructor(@Inject(MAT_DIALOG_DATA)public data: DialogModel, private dialogRef: MatDialogRef<SimpleDialogComponent>) {

  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
