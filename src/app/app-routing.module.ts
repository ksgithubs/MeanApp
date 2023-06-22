import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CreateProductComponent } from './admin/create-product/create-product.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignupComponent } from './signup/signup.component';




const routes: Routes = [

  {path:'home',component:HomeComponent},
  {path:'login',component:LogInComponent},
  {path:'contactus',component:ContactUsComponent},
  {path:'signup',component:SignupComponent},
  {path:'createproduct',component:CreateProductComponent},
  {path:"",redirectTo:"home",pathMatch:"full"},
  { path: 'userprofile/:username', loadChildren: () => import('./userprofile/userprofile.module').then(m => m.UserprofileModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
