import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryAddPageRoutingModule } from './inventory-add-routing.module';

import { InventoryAddPage } from './inventory-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryAddPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [InventoryAddPage]
})
export class InventoryAddPageModule {}
