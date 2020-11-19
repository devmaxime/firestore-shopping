import {Component, OnInit} from '@angular/core';
import {InventoryService} from '../../services/inventory.service';
import {AlertController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {Grocery} from '../../models/grocery';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.page.html',
    styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

    public groceryList: Observable<Grocery[]>;

    constructor(
        private inventoryService: InventoryService,
        private alertCtrl: AlertController
    ) {
    }

    ngOnInit() {
        this.inventoryService.getGroceryList().then(groceryList$ => {
            this.groceryList = groceryList$.valueChanges();
        });
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
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Add',
                    handler: data => {
                        const quantity: number = parseFloat(data.quantity);
                        this.inventoryService.addGroceryQuantity(groceryId, quantity);
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
                    type: 'number',
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    },
                },
                {
                    text: 'Take Out',
                    handler: data => {
                        const quantity: number = parseFloat(data.quantity);
                        this.inventoryService.removeGroceryQuantity(groceryId, quantity);
                    },
                },
            ],
        });
        prompt.present();
    }

    async deleteGrocery(groceryId: string): Promise<void> {
        console.log('Deleting.. ' + groceryId);
        this.inventoryService.deleteGrocery(groceryId);
    }
}
