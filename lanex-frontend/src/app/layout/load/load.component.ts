import { Component, OnInit} from '@angular/core';
import { LoadService } from 'src/app/shared/services/load.service';
import { LoadModel } from 'src/app/shared/models/Load.model';
@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit{

  public show = false;
  public primaryColour = '#dd0031';
  public secondaryColour = '#006ddd';

  constructor(public LoadService: LoadService) { 
      
  }

  ngOnInit() {
    this.LoadService.loaderState.subscribe((state: LoadModel) => {
      this.show = state.show;
    });
  }
}
