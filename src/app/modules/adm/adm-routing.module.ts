import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmComponent } from './pages/adm/adm.component';
import { AreaComponent } from './pages/area/area.component';

const routes: Routes = [
  { path: '', component: AdmComponent },
  { path: ':area', component: AreaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
