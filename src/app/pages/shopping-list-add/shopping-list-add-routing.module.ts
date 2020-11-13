import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListAddPage } from './shopping-list-add.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListAddPageRoutingModule {}
