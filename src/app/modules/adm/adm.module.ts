import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { AdmComponent } from './pages/adm/adm.component';


@NgModule({
  declarations: [
    AdmComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule
  ]
})
export class AdmModule { }
