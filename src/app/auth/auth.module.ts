import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AuthPage } from './auth.page';
import { CadastrarPage } from './cadastrar/cadastrar.page';

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AuthPage,
    CadastrarPage
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
