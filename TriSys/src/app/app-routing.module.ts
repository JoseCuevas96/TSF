import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './Moduls/Dashboard/Classes/Classes.component';
import { ClassLocationsComponent } from './Moduls/Dashboard/ClassLocations/ClassLocations.component';
import { ClassTypesComponent } from './Moduls/Dashboard/ClassTypes/ClassTypes.component';
import { DashboardComponent } from './Moduls/Dashboard/Dashboard/Dashboard.component';
import { LoginComponent } from './Moduls/Login/Login/Login.component';
import { HeaderComponent } from './Moduls/Shared/Header/Header/Header.component';

const routes: Routes = [
  {  path: '', component: LoginComponent},
  {  path: 'dashboard', component: DashboardComponent},
  {  path: 'classes', component: ClassesComponent},
  {  path: 'types', component: ClassTypesComponent},
  {  path: 'locations', component: ClassLocationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
