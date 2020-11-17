import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { InventoryService } from '../../services/inventory.service';
import {Grocery} from '../../models/grocery';
import firebase from 'firebase/app';

@Component({
  selector: 'app-inventory-add',
  templateUrl: './inventory-add.page.html',
  styleUrls: ['./inventory-add.page.scss'],
})
export class InventoryAddPage  {

  public inShoppingList = false;
  public addGroceryForm: FormGroup;
  public teamId: string;

  constructor(
      private alertCtrl: AlertController,
      private route: ActivatedRoute,
      private router: Router,
      private loadingCtrl: LoadingController,
      private inventoryService: InventoryService,
      private formBuilder: FormBuilder
  ) {
    if (this.route.snapshot.paramMap.has('inShoppingList')) {
      this.inShoppingList = JSON.parse(
          this.route.snapshot.paramMap.get('inShoppingList')
      );
    }
    this.addGroceryForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      quantity: [0, Validators.compose([Validators.required])],
      units: ['', Validators.compose([Validators.required])],
    });
  }

  async addGrocery(addGroceryForm): Promise<any> {
    const loading = await this.loadingCtrl.create();
    try {
      loading.present();

      const name: string = addGroceryForm.value.name;
      const quantity: number = parseFloat(addGroceryForm.value.quantity);
      const units: string = addGroceryForm.value.units;

      await this.inventoryService.createGrocery(
          name,
          quantity,
          units,
          this.inShoppingList
      );
      await loading.dismiss();
      this.router.navigateByUrl('/tabs/inventory');
    } catch (error) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        message: error.message,
        buttons: [{ text: 'Ok', role: 'cancel' }],
      });
      alert.present();
    }
  }
}
