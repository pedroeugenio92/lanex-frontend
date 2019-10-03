import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { MaterialModule } from '../shared/modules/material.module';
import { MessageErrorComponent } from './message/message-error/message-error.component';
import { LoadComponent } from './load/load.component';
import { NgxLoadingModule } from 'ngx-loading';
import { LayoutHeaderRoutes } from './header/header.routing';
import { RouterModule } from '@angular/router';
import { MessageSuccessComponent } from './message/message-success/message-success.component';
import { MessageWarnComponent } from './message/message-warn/message-warn.component';

@NgModule({
  declarations: [ 
    MessageErrorComponent,
    MessageSuccessComponent,
    MessageWarnComponent, 
    LoadComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HeaderModule,
    NgxLoadingModule.forRoot({}),
    RouterModule.forChild([...LayoutHeaderRoutes])
  
  ],
  entryComponents:[
    MessageErrorComponent,
    MessageSuccessComponent,
    MessageWarnComponent, 
  ],
  exports:[
    HeaderModule,
    LoadComponent
    
  ]

})
export class LayoutModule { }
