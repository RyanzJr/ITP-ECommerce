import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireAuthModule } from '@angular/fire/auth';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

import { Routes, RouterModule } from '@angular/router';
import { HomePage } from '../app/home/home.page';

const routes: Routes = [
  {
    path: ' ',
    redirectTo: '/home',
    pathMatch:'full' 
  },
  {
    path: ' ',
    component: HomePage,
    children: [
      {
        path: 'tapes',
        loadChildren: () => import('./tapes/tapes.module').then( m => m.TapesPageModule)
      },
      {
        path: 'others',
        loadChildren: () => import('./others/others.module').then( m => m.OthersPageModule)
      },
    ]
  }
];

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireAuthModule
    ,AngularFireModule.initializeApp(environment.firebase), AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
//    { provide: FirestoreSettingsToken, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
