import { Component, OnInit, Input, ViewChild, SimpleChanges, Output, EventEmitter,Inject} from '@angular/core';
import { ScreenList } from '../../models/ScreenList.model';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { LoadService } from '../../services/load.service';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { HeaderScreenList } from '../../models/HeaderScreenList.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  @Output() addElement: EventEmitter<any> = new EventEmitter();
  @Output() editElement: EventEmitter<any> = new EventEmitter();
  @Output() deleteElement: EventEmitter<any> = new EventEmitter();

  @Input() objectList: ScreenList;
  @Input() headerObjectList: HeaderScreenList;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource(); 
  columnsShow: string [] = [];
  showTable = false;
  elementDelete: any;
  dataSourceList = [];
  pipe: DatePipe;

  constructor(private LoadService: LoadService,public dialog: MatDialog) {
  }

  ngOnInit() {
    
    this.LoadService.show();  
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if(changes.objectList.currentValue){
      this.showTable = true;
      this.dataSource.sort = this.sort;
      if(this.dataSource.data.length){
        this.dataSource.data = this.objectList.date;
      }else{
        if(!this.columnsShow.length){
          this.objectList.columns.forEach(element => {
            this.columnsShow.push(element.name);
          });
        }
        this.dataSource = new MatTableDataSource(this.objectList.date);
      }
      this.dataSourceList =  this.objectList.date;
      this.LoadService.hide();
    }
  }

  addElementCall(){
    this.addElement.emit();
  }
  editElementCall(element){
    this.editElement.emit(element);
  }

  openDialogDelete(element): void {
    this.elementDelete = element;
    const dialogRef = this.dialog.open(ModalDeleteComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteElementCall();
      }
    });
  }
  deleteElementCall(){
    this.deleteElement.emit(this.elementDelete);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
