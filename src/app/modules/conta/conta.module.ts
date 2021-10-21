import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContaRoutingModule } from './conta-routing.module';
import { ContaComponent } from './pages/conta/conta.component';
import { LancamentosComponent } from './pages/lancamentos/lancamentos.component';
import { FormContaComponent } from './pages/form-conta/form-conta.component';
import { FormLancamentosComponent } from './pages/form-lancamentos/form-lancamentos.component';

@NgModule({
  declarations: [
    ContaComponent,
    LancamentosComponent,
    FormContaComponent,
    FormLancamentosComponent,
  ],
  imports: [
    CommonModule,
    ContaRoutingModule,
  ]
})
export class ContaModule { }
