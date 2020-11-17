import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {InventoryService} from '../../services/inventory.service';
import {Observable} from 'rxjs';
import {Grocery} from '../../models/grocery';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.page.html',
    styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {

    groceryList: Observable<Grocery[]>;
    pickedGroceryList: Observable<Grocery[]>;

    constructor(
        public alertCtrl: AlertController,
        public inventoryService: InventoryService
    ) {
    }

    ngOnInit() {
        this.inventoryService
            .getGroceryListForShoppingList(true)
            .then(groceryList$ => {
                this.groceryList = groceryList$.valueChanges();
            });

        this.inventoryService
            .getPickedGroceryListForShoppingList(true)
            .then(pickedGroceryList$ => {
                this.pickedGroceryList = pickedGroceryList$.valueChanges();
            });
    }

    async pickQuantity(
        groceryId: string,
        name: string,
        units: string
    ): Promise<void> {
        const prompt = await this.alertCtrl.create({
            message: `How many ${units} of ${name} are you picking up?`,
            inputs: [{ name: 'quantity', placeholder: `1`, type: 'number' }],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Add',
                    handler: data => {
                        const quantityShopping: number = parseFloat(data.quantity);
                        this.inventoryService.pickUpGroceryFromShoppingList(
                            groceryId,
                            quantityShopping
                        );
                    }
                }
            ]
        });
        prompt.present();
    }

    async addGrocery(groceryId: string): Promise<void> {
        const prompt = await this.alertCtrl.create({
            message: 'How many are you adding?',
            inputs: [
                {
                    name: 'quantity',
                    placeholder: '0',
                    type: 'number'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Add',
                    handler: data => {
                        const quantityShopping: number = parseFloat(data.quantity);
                        this.inventoryService.addQuantityGroceryFromShoppingList(
                            groceryId,
                            quantityShopping
                        );
                    }
                }
            ]
        });
        prompt.present();
    }

    async removeGrocery(groceryId: string): Promise<void> {
        const prompt = await this.alertCtrl.create({
            message: 'How many are you taking out?',
            inputs: [
                {
                    name: 'quantity',
                    placeholder: '0',
                    type: 'number'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Take Out',
                    handler: data => {
                        const quantityShopping: number = parseFloat(data.quantity);
                        this.inventoryService.removeQuantityGroceryFromShoppingList(
                            groceryId,
                            quantityShopping
                        );
                    }
                }
            ]
        });
        prompt.present();
    }
}
