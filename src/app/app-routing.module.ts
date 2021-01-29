import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'homeuser',
    loadChildren: () => import('./homeuser/homeuser.module').then( m => m.HomeuserPageModule)
  },
  {
    path: 'homeadmin',
    loadChildren: () => import('./homeadmin/homeadmin.module').then( m => m.HomeadminPageModule)
  },
  {
    path: 'homeadmin/:id', 
  loadChildren: () => import('./homeadmin/homeadmin.module').then( m => m.HomeadminPageModule)
  },
  {
    path: 'idea-list',
    loadChildren: () => import('./idea-list/idea-list.module').then( m => m.IdeaListPageModule)
  },
  {
    path: 'idea-details',
    loadChildren: () => import('./idea-details/idea-details.module').then( m => m.IdeaDetailsPageModule)
  },
  {
    path: 'idea-details/:id', 
  loadChildren: () => import('./idea-details/idea-details.module').then( m => m.IdeaDetailsPageModule)
  },  {
    path: 'account-list',
    loadChildren: () => import('./manageAccounts/account-list/account-list.module').then( m => m.AccountListPageModule)
  },
  {
    path: 'add-account',
    loadChildren: () => import('./manageAccounts/add-account/add-account.module').then( m => m.AddAccountPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./manageProducts/product-list/product-list.module').then( m => m.ProductListPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
