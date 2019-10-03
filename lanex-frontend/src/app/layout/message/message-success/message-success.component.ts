import { Component, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material';
@Component({
  selector: 'app-message-sucess',
  template: '<span class="snackBarMessage"><mat-icon>error_outline</mat-icon> {{ data }} <i class="material-icons snackbar-close" (click)="onActionBtnClick()">close</i></span>'
})
export class MessageSuccessComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,private snackBarRef: MatSnackBarRef<MessageSuccessComponent>){ }

  onActionBtnClick() {
    this.snackBarRef.dismissWithAction();
  }

}
