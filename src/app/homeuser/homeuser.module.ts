import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeuserPageRoutingModule } from './homeuser-routing.module';

import { HomeuserPage } from './homeuser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeuserPageRoutingModule
  ],
  declarations: [HomeuserPage]
})
export class HomeuserPageModule {}
