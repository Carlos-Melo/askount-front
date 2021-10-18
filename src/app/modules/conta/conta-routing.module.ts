import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaComponent } from './pages/conta/conta.component';
import { LancamentosComponent } from './pages/lancamentos/lancamentos.component';

const routes: Routes = [
  { path: '', component: ContaComponent },
  { path: 'lancamentos', component: LancamentosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }
