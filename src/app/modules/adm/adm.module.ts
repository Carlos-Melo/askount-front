import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmRoutingModule } from './adm-routing.module';
import { AdmComponent } from './pages/adm/adm.component';
import { AreaComponent } from './pages/area/area.component';
import { FormAreaComponent } from './pages/form-area/form-area.component';


@NgModule({
  declarations: [
    AdmComponent,
    AreaComponent,
    FormAreaComponent
  ],
  imports: [
    CommonModule,
    AdmRoutingModule
  ]
})
export class AdmModule { }
