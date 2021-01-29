import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeuserPage } from './homeuser.page';

const routes: Routes = [
  {
    path: '',
    component: HomeuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeuserPageRoutingModule {}
