import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotosModule } from './photos/photos.module';
import { CoreModule } from './core/core.module';
import { VMessageModule } from './shared/components/vmessage/vmessage.module';
import { HomeModule } from './home/home.module';
import { AlertModule } from './shared/components/alert/alert.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PhotosModule,
    CoreModule,
    VMessageModule,
    AppRoutingModule,
    AlertModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
