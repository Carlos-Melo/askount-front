import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { ConfiguracoesComponent } from './pages/configuracoes/configuracoes.component';


@NgModule({
  declarations: [
    ConfiguracoesComponent
  ],
  imports: [
    CommonModule,
    ConfiguracoesRoutingModule
  ]
})
export class ConfiguracoesModule { }
