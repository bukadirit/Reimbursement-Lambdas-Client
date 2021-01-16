import { ProfileComponent } from './profile/profile.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { PortalComponent } from './portal/portal.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.guard';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'portal',
    component: PortalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'create-ticket',
    component: CreateTicketComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view-ticket',
    component: ViewTicketComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
