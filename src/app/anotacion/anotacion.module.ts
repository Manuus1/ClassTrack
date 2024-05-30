import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AnotacionRoutingModule } from './anotacion-routing.module';
import { AnotacionPage } from './anotacion.page';


@NgModule({
  declarations: [AnotacionPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    AnotacionRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AnotacionModule { }
