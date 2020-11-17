import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Grocery } from '../models/grocery';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
      public firestore: AngularFirestore,
      public authService: AuthService
  ) {}

  async getGroceryList(): Promise<AngularFirestoreCollection<Grocery>> {
    const teamId: string = await this.authService.getTeamId();
    return this.firestore.collection<Grocery>(
        `/teamProfile/${teamId}/groceryList`,
        ref => ref.orderBy('quantity')
    );
  }

  async addGroceryQuantity(groceryId: string, quantity: number): Promise<void> {
    const teamId: string = await this.authService.getTeamId();
    const groceryRef: firebase.firestore.DocumentReference = this.firestore.doc(
        `/teamProfile/${teamId}/groceryList/${groceryId}`
    ).ref;

    return this.firestore.firestore.runTransaction(transaction => {
      return transaction.get(groceryRef).then(groceryDoc => {
        const newQuantity: number = groceryDoc.data().quantity + quantity;
        transaction.update(groceryRef, { quantity: newQuantity });
      });
    });
  }

  async removeGroceryQuantity(
      groceryId: string,
      quantity: number
  ): Promise<void> {
    const teamId: string = await this.authService.getTeamId();
    const groceryRef = this.firestore.doc(
        `/teamProfile/${teamId}/groceryList/${groceryId}`
    ).ref;

    return this.firestore.firestore.runTransaction(transaction => {
      return transaction.get(groceryRef).then(groceryDoc => {
        const newQuantity: number = groceryDoc.data().quantity - quantity;
        transaction.update(groceryRef, { quantity: newQuantity });
      });
    });
  }

  async createGrocery(
      name: string,
      quantity: number,
      units: string,
      inShoppingList: boolean = false
  ): Promise<void> {
    const teamId: string = await this.authService.getTeamId();
    const groceryId: string = this.firestore.createId();

    return this.firestore
        .doc<Grocery>(`/teamProfile/${teamId}/groceryList/${groceryId}`)
        .set({
          id: groceryId,
          name,
          quantity,
          units,
          teamId,
          inShoppingList,
          picked: false,
          quantityShopping: 0
        });
  }

  async getGroceryListForShoppingList(
      isInShoppingList: boolean
  ): Promise<AngularFirestoreCollection<Grocery>> {
    const teamId: string = await this.authService.getTeamId();
    return this.firestore.collection<Grocery>(
        `/teamProfile/${teamId}/groceryList`,
        ref =>
            ref
                .where('inShoppingList', '==', isInShoppingList)
                .where('picked', '==', false)
    );
  }

  async getPickedGroceryListForShoppingList(
      isInShoppingList: boolean
  ): Promise<AngularFirestoreCollection<Grocery>> {
    const teamId: string = await this.authService.getTeamId();
    return this.firestore.collection<Grocery>(
        `/teamProfile/${teamId}/groceryList`,
        ref =>
            ref
                .where('inShoppingList', '==', isInShoppingList)
                .where('picked', '==', true)
    );
  }

  async pickUpGroceryFromShoppingList(
      groceryId: string,
      quantityShopping: number
  ): Promise<void> {
    const teamId: string = await this.authService.getTeamId();
    const groceryRef: firebase.firestore.DocumentReference = this.firestore.doc(
        `/teamProfile/${teamId}/groceryList/${groceryId}`
    ).ref;

    return this.firestore.firestore.runTransaction(transaction => {
      return transaction.get(groceryRef).then(groceryDoc => {
        const newQuantity: number =
            groceryDoc.data().quantity + quantityShopping;

        transaction.update(groceryRef, {
          quantity: newQuantity,
          quantityShopping,
          picked: true
        });
      });
    });
  }

  async addQuantityGroceryFromShoppingList(
      groceryId: string,
      quantityShopping: number
  ): Promise<void> {
    const teamId: string = await this.authService.getTeamId();
    const groceryRef: firebase.firestore.DocumentReference = this.firestore.doc(
        `/teamProfile/${teamId}/groceryList/${groceryId}`
    ).ref;

    return this.firestore.firestore.runTransaction(transaction => {
      return transaction.get(groceryRef).then(groceryDoc => {
        const newQuantity: number =
            groceryDoc.data().quantity + quantityShopping;
        const newQuantityShopping: number =
            groceryDoc.data().quantityShopping + quantityShopping;
        transaction.update(groceryRef, {
          quantity: newQuantity,
          quantityShopping: newQuantityShopping
        });
      });
    });
  }

  async removeQuantityGroceryFromShoppingList(
      groceryId: string,
      quantityShopping: number
  ): Promise<void> {
    const teamId: string = await this.authService.getTeamId();
    const groceryRef: firebase.firestore.DocumentReference = this.firestore.doc(
        `/teamProfile/${teamId}/groceryList/${groceryId}`
    ).ref;

    return this.firestore.firestore.runTransaction(transaction => {
      return transaction.get(groceryRef).then(groceryDoc => {
        const newQuantity: number =
            groceryDoc.data().quantity - quantityShopping;
        const newQuantityShopping: number =
            groceryDoc.data().quantityShopping - quantityShopping;
        transaction.update(groceryRef, {
          quantity: newQuantity,
          quantityShopping: newQuantityShopping,
          picked: newQuantityShopping <= 0 ? false : true
        });
      });
    });
  }

  async addGroceryToShoppingList(groceryId: string): Promise<void> {
    const teamId: string = await this.authService.getTeamId();
    const groceryRef: AngularFirestoreDocument<Grocery> = this.firestore.doc(
        `/teamProfile/${teamId}/groceryList/${groceryId}`
    );

    return groceryRef.update({
      inShoppingList: true
    });
  }

}
