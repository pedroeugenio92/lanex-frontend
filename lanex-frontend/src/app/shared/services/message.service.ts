import { Injectable } from '@angular/core';
import { MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
 } from '@angular/material';
import { MessageErrorComponent } from 'src/app/layout/message/message-error/message-error.component';
import { MessageWarnComponent } from 'src/app/layout/message/message-warn/message-warn.component';
import { MessageSuccessComponent } from 'src/app/layout/message/message-success/message-success.component';

@Injectable()
export class MessageService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  erroComponent : MessageErrorComponent;
  
  public constructor(private snackBar: MatSnackBar) {}

  public simple(message: string, showCloseButton = false, duration = 8000): MatSnackBarRef<SimpleSnackBar> {
    const ref = this.snackBar.open( message, showCloseButton ? 'Fechar' : null, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });

    ref.onAction().subscribe(() => {});

    return ref;
  }
  public errorMsg(message: string, duration = 8000 ){
    
    const ref = this.snackBar.openFromComponent(MessageErrorComponent,{
      data: message,
      ...{
        duration: duration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: 'snackBarError'
      }
    });
    ref.onAction().subscribe(() => {});


    return ref;
  }
  public warnMsg(message: string, duration = 8000 ){
    const ref = this.snackBar.openFromComponent(MessageWarnComponent,{
      data: message,
      ...{
        duration: duration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: 'snackBarWarn'
      }
    });
    ref.onAction().subscribe(() => {});


    return ref;
  }

  public succMsg(message: string, duration = 8000) {
    const ref = this.snackBar.openFromComponent(MessageSuccessComponent,{
      data: message,
      ...{
        duration: duration,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: 'snackBarSuccess'
      }
    });
    ref.onAction().subscribe(() => {});


    return ref;
  }

}