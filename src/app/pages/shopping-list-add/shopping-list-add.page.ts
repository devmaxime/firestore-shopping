import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../../services/inventory.service';
import {Grocery} from '../../models/grocery';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.page.html',
  styleUrls: ['./shopping-list-add.page.scss'],
})
export class ShoppingListAddPage implements OnInit {
  public groceryList: Observable<Grocery[]>;
  constructor(private inventoryService: InventoryService) { }

  ngOnInit() {
    this.inventoryService.getGroceryListForShoppingList(false).then(groceryList$ => {
      this.groceryList = groceryList$.valueChanges();
    });
  }

  addGrocery(groceryId: string): void {
    this.inventoryService.addGroceryToShoppingList(groceryId);
  }

}
