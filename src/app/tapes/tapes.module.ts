import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TapesPageRoutingModule } from './tapes-routing.module';

import { TapesPage } from './tapes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TapesPageRoutingModule
  ],
  declarations: [TapesPage]
})
export class TapesPageModule {}
