import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContaRoutingModule } from './conta-routing.module';
import { ContaComponent } from './pages/conta/conta.component';
import { LancamentosComponent } from './pages/lancamentos/lancamentos.component';


@NgModule({
  declarations: [
    ContaComponent,
    LancamentosComponent
  ],
  imports: [
    CommonModule,
    ContaRoutingModule
  ]
})
export class ContaModule { }
