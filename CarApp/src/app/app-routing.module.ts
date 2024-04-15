import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { AddFormComponent } from './components/add-form/add-form.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';

const routes: Routes = [
  {path : '', component: HomepageComponent},
  {path : 'home', component : HomepageComponent},
  {path : 'add', component : AddFormComponent},
  {path : 'detail/:id', component : DetailViewComponent},
  {path : 'edit/:id', component : AddFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
