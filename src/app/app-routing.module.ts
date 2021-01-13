import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { PortalComponent } from './portal/portal.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'portal', component: PortalComponent },
  { path: 'create-ticket', component: CreateTicketComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
