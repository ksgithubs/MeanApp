import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateProductComponent } from './create-product/create-product.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {path:"createproducts", component:CreateProductComponent}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
