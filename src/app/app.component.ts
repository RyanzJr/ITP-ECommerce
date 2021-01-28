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
  pagesPublic: any
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
        url   : '/homeadmin',
        icon  : 'pricetags' 
        },
      { 
        title : 'Profile',  
        url   : '/profile',  
        icon  : 'person'  
      },   
      {  
        title : 'Manage Accounts',  
        url   : '/account-list',  
        icon  : 'key'   
      },  
      {  
        title : 'Manage Products',  
        url   : '/product-list',  
        icon  : 'book'  
      },   
    ];

    this.pagesUser =   
    [  
      { 
        title : 'Products',
        url   : '/homeuser',
        icon  : 'pricetags' 
        },
      { 
        title : 'Profile',  
        url   : '/profile',  
        icon  : 'person'  
      },    
    ];  

    this.pagesPublic =   
    [  
      { 
        title : 'All Products',
        url   : '/home',
        icon  : 'pricetags' 
      },
      { 
        title : 'Hardware',
        url   : '/home',
        icon  : 'pricetags' 
      },
      { 
        title : 'Lighting',
        url   : '/home',
        icon  : 'pricetags' 
      },
      { 
        title : 'Plumbing',
        url   : '/home',
        icon  : 'pricetags' 
      },
      { 
        title : 'Paint',
        url   : '/home',
        icon  : 'pricetags' 
      },
      { 
        title : 'Electrical',
        url   : '/home',
        icon  : 'pricetags' 
      }
    ];
  }  

}
