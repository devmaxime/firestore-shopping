import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,  AngularFireModule.initializeApp({
    apiKey: "AIzaSyDDxg--eyaMoUYZUX1YLMPF6fBM5k2qHxg",
    authDomain: "testing-2e992.firebaseapp.com",
    databaseURL: "https://testing-2e992.firebaseio.com",
    projectId: "testing-2e992",
    storageBucket: "testing-2e992.appspot.com",
    messagingSenderId: "862588954149",
    appId: "1:862588954149:web:f7efba57085188a363c1cc",
    measurementId: "G-XX9M8DTND7"
  }),
    AngularFireAuthModule,
    AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
