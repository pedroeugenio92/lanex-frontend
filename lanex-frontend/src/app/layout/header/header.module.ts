import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule
  ],
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [
    
  ]
})
export class HeaderModule { }
