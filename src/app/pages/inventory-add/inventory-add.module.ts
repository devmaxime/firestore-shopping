import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryAddPageRoutingModule } from './inventory-add-routing.module';

import { InventoryAddPage } from './inventory-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryAddPageRoutingModule
  ],
  declarations: [InventoryAddPage]
})
export class InventoryAddPageModule {}
