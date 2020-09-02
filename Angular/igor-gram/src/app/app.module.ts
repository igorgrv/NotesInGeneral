import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhotosModule } from './photos/photos.module';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';
import { VMessageModule } from './shared/components/vmessage/vmessage.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PhotosModule,
    HomeModule,
    CoreModule,
    VMessageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
