import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LogInComponent } from './log-in/log-in.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { AuthorizationService } from './authorization.service';
import { CreateProductComponent } from './admin/create-product/create-product.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactUsComponent,
    LogInComponent,
    SignupComponent,
    CreateProductComponent,

        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthorizationService,
    multi: true
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
