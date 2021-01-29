import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TapesPage } from './tapes.page';

const routes: Routes = [
  {
    path: '',
    component: TapesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TapesPageRoutingModule {}
