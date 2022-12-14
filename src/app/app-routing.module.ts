import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'list/create',
    loadChildren: () => import('./list/create/create.module').then( m => m.CreatePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'list/view/:listId',
    loadChildren: () => import('./list/view/view.module').then( m => m.ViewPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'purchase/create/:listId',
    loadChildren: () => import('./purchase/create/create.module').then( m => m.CreatePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'purchase/view/:purchaseId',
    loadChildren: () => import('./purchase/view/view.module').then( m => m.ViewPageModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
