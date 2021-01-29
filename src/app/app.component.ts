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
        title : 'Manage Accounts',  
        url   : '/account-list',  
        icon  : 'key'   
      },  
      {  
        title : 'Manage Products',  
        url   : '/idea-list',  
        icon  : 'book'  
      },   

      { 
        title : 'All Products',
        url   : '/homeadmin',
        icon  : 'pricetags' 
      },
      { 
        title : 'Hardware',
        children:[
          {
            title: "Tapes",
            url   : '/tapes',
            icon  : 'pricetags',
          },
          {
            title: "Others",
            url   : '/others',
            icon  : 'pricetags',
          },
        ]
      },
      { 
        title : 'Lighting',
        children:[
          {
            title: "LED",
            url   : '/tapes',
            icon  : 'pricetags',
          },
          {
            title: "Ligh Bulbs",
            url   : '/others',
            icon  : 'pricetags',
          },
        ]
      },
      { 
        title : 'Plumbing',
        children:[
          {
            title: "Pipes",
            url   : '/tapes',
            icon  : 'pricetags',
          },
          {
            title: "Water Filter",
            url   : '/others',
            icon  : 'pricetags',
          },
        ]
      },
      { 
        title : 'Paint',
        children:[
          {
            title: "Nippon",
            url   : '/tapes',
            icon  : 'pricetags',
          },
          {
            title: "Other Company",
            url   : '/others',
            icon  : 'pricetags',
          },
        ]
      },
      { 
        title : 'Electrical',
        children:[
          {
            title: "Wires",
            url   : '/tapes',
            icon  : 'pricetags',
          },
          {
            title: "Circuit",
            url   : '/others',
            icon  : 'pricetags',
          },
        ]
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
        children:[
          {
            title: "Tapes",
            url   : '/tapes',
            icon  : 'pricetags',
          },
          {
            title: "Others",
            url   : '/others',
            icon  : 'pricetags',
          },
        ]
      },
      { 
        title : 'Lighting',
        children:[
          {
            title: "LED",
            url   : '/tapes',
            icon  : 'pricetags',
          },
          {
            title: "Ligh Bulbs",
            url   : '/others',
            icon  : 'pricetags',
          },
        ]
      },
      { 
        title : 'Plumbing',
        children:[
          {
            title: "Pipes",
            url   : '/tapes',
            icon  : 'pricetags',
          },
          {
            title: "Water Filter",
            url   : '/others',
            icon  : 'pricetags',
          },
        ]
      },
      { 
        title : 'Paint',
        children:[
          {
            title: "Nippon",
            url   : '/tapes',
            icon  : 'pricetags',
          },
          {
            title: "Other Company",
            url   : '/others',
            icon  : 'pricetags',
          },
        ]
      },
      { 
        title : 'Electrical',
        children:[
          {
            title: "Wires",
            url   : '/tapes',
            icon  : 'pricetags',
          },
          {
            title: "Circuit",
            url   : '/others',
            icon  : 'pricetags',
          },
        ]
      },
    ];
  }  

}