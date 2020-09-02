import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { SigninComponent } from './home/signin/signin.component';
import { AuthGuard } from './core/auth/auth.guard';
import { SignupComponent } from './home/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { User } from './core/user/User';

const routes: Routes = [
  {
    path: 'user/:username',
    component: PhotoListComponent,
    resolve: { photos: PhotoListResolver },
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: '',
        component: SigninComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
