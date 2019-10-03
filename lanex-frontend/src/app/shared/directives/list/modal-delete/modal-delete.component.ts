import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalDeleteComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }


}
