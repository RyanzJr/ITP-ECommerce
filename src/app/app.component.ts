import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  pagesUser: any
  pagesAdmin: any
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu() {  
    this.pagesAdmin =   
    [  
        { 
        title : 'Products',
        url   : '/apps',
        icon  : 'pricetags' 
        },
      { 
        title : 'Profile',  
        url   : '/book',  
        icon  : 'person'  
      },   
      {  
        title : 'Manage Accounts',  
        url   : '/paint',  
        icon  : 'key'   
      },  
      {  
        title : 'Manage Products',  
        url   : '/contacts',  
        icon  : 'book'  
      },   
      {
          title : 'Sign Out',
          url   : '/facebook.com',
          icon  : 'log-out'
      },
    ];  
  }  

}
