import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, pt_BR, NzListModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, CommonModule } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { GraphQLModule } from './graphql.module';
import { HomeComponent } from './pages/home/home.component';
import { OptionAComponent } from './pages/option-a/option-a.component';
import { OptionCComponent } from './pages/option-c/option-c.component';
import { OptionDComponent } from './pages/option-d/option-d.component';
import { OptionBComponent } from './pages/option-b/option-b.component';
import { IconLabComponent } from './components/icon-lab/icon-lab.component';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OptionAComponent,
    OptionBComponent,
    OptionCComponent,
    OptionDComponent,
    IconLabComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    NzListModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GraphQLModule
  ],
  providers: [{ provide: NZ_I18N, useValue: pt_BR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
