import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { authGuardGuard } from './Auth/Guard/auth-guard.guard';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  // {path : '', component: HomepageComponent},
  {path : '', redirectTo: '/login', pathMatch: 'full'},
  {path : 'home', component: HomepageComponent, canActivate: [authGuardGuard] },
  {path : 'login', component: LoginComponentComponent},
  {path : 'register', component: RegisterComponent},
  {path : 'home', component : HomepageComponent},
  {path : 'add', component : AddFormComponent},
  {path : 'detail/:id', component : DetailViewComponent},
  {path : 'edit/:id', component : AddFormComponent},
  {path : 'table', component : TableViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
