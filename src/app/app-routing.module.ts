import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardWrapperComponent } from './dashboard-form/BusinessComponents/dashboard-wrapper/dashboard-wrapper.component';
import { DashboardViewComponent } from './dashboard-form/FunctionalComponents/dashboard-view/dashboard-view.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardWrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
