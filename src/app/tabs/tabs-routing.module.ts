import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'shopping-list',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/shopping-list/shopping-list.module').then(m => m.ShoppingListPageModule),
          },
          {
            path: 'shopping-list-add',
            loadChildren: () => import('../pages/shopping-list-add/shopping-list-add.module').then(m => m.ShoppingListAddPageModule),
          },
        ],
      },
      {
        path: 'inventory',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/inventory/inventory.module').then(m => m.InventoryPageModule)
          },
          {
            path: 'inventory-add',
            loadChildren: () => import('../pages/inventory-add/inventory-add.module').then(m => m.InventoryAddPageModule)
          },
          {
            path: 'inventory-add/:inShoppingList',
            loadChildren: () => import('../pages/inventory-add/inventory-add.module').then( m => m.InventoryAddPageModule)
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/shopping-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/inventory',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
