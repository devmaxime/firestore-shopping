import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingListAddPageRoutingModule } from './shopping-list-add-routing.module';

import { ShoppingListAddPage } from './shopping-list-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingListAddPageRoutingModule
  ],
  declarations: [ShoppingListAddPage]
})
export class ShoppingListAddPageModule {}
