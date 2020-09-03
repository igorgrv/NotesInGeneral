import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [SigninComponent, SignupComponent, HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    VMessageModule,
    HomeRoutingModule,
    RouterModule
  ],
})
export class HomeModule {}
