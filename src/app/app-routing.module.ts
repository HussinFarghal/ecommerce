import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardGuard } from './core/guards/authentication-guard.guard';

const routes: Routes = [
  {
    path: 'admin',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./features/customer/landing/landing.module').then(m => m.LandingModule),
    canActivate: []
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthenticationGuardGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/features/authentication/authentication.module').then(m => m.AuthenticationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
