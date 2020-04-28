import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { OptionAComponent } from './pages/option-a/option-a.component';
import { OptionBComponent } from './pages/option-b/option-b.component';
import { OptionCComponent } from './pages/option-c/option-c.component';
import { IconLabComponent } from './components/icon-lab/icon-lab.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OptionAComponent,
    OptionBComponent,
    OptionCComponent,
    IconLabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
