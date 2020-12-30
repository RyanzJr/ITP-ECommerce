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
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
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
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
