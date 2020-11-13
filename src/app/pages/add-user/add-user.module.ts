import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUserPageRoutingModule } from './add-user-routing.module';

import { AddUserPage } from './add-user.page';
import {AuthModule} from '../../shared-modules/auth.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthModule,
    AddUserPageRoutingModule
  ],
  declarations: [AddUserPage]
})
export class AddUserPageModule {}
