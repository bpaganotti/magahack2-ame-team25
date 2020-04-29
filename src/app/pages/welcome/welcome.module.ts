import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { FormsModule } from '@angular/forms';

import { NzListModule } from 'ng-zorro-antd/list';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [WelcomeRoutingModule, 
    NgZorroAntdModule,
    IconsProviderModule,
    CommonModule,
    FormsModule,
    NzListModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
