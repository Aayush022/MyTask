import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';

const routes: Routes = [
  { path: 'bank', component: TableComponent},
  { path: 'bank/:id', component: BankDetailsComponent},
  { path: '', redirectTo: 'bank', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
