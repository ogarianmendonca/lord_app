import { PerfilPage } from './perfil/perfil.page';
import { MenuRoutingModule } from './menu-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PerfilPage
  ]
})
export class MenuModule { }
