import { AlertasService } from './../../services/alertas.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public sobeDesce: number = 0;
  public lado: number = 0;

  constructor(private alertasService: AlertasService) {}

  ngOnInit() {
    this.alertasService.showAlert("Coloque o chapéu com bigode na cabeça do macaco!");
  }

  descer() {
    if(this.sobeDesce == 0) {
      this.sobeDesce = 10;
    } else {
      this.sobeDesce = this.sobeDesce + 10;
    }
    this.mostraAlerta();
  }

  subir() {
    if(this.sobeDesce == 0) {
      this.sobeDesce = -10;
    } else {
      this.sobeDesce = this.sobeDesce - 10;
    }
  }

  esquerda() {
    if(this.lado == 0) {
      this.lado = -10;
    } else {
      this.lado = this.lado - 10;
    }
  }

  direita() {
    if(this.lado == 0) {
      this.lado = 10;
    } else {
      this.lado = this.lado + 10;
    }
    this.mostraAlerta();
  }

  mostraAlerta() {
    if(this.sobeDesce == 330 && this.lado == 200) {
      this.alertasService.showAlert("Parabéns! Você conseguiu!");
    }

    if(this.sobeDesce == 40 && this.lado == 130){
      this.alertasService.showAlert("Ops! Cuidado com a tesoura!");
      this.resetaJogo();
    } 

    if(this.sobeDesce == 30 && this.lado == 140){
      this.alertasService.showAlert("Ops! Cuidado com a tesoura!");
      this.resetaJogo();
    } 

    if(this.sobeDesce == 80 && this.lado == 100){
      this.alertasService.showAlert("Ops! Cuidado com a tesoura!");
      this.resetaJogo();
    } 

    if(this.sobeDesce == 90 && this.lado == 60){
      this.alertasService.showAlert("Ops! Cuidado com a tesoura!");
      this.resetaJogo();
    } 

    if(this.sobeDesce == 60 && this.lado == 110){
      this.alertasService.showAlert("Ops! Cuidado com a tesoura!");
      this.resetaJogo();
    } 

    if(this.sobeDesce == 180 && this.lado == 40){
      this.alertasService.showAlert("Ops! Cuidado com a tesoura!");
      this.resetaJogo();
    } 

    if(this.sobeDesce == 250 && this.lado == 130){
      this.alertasService.showAlert("Ops! Cuidado com a tesoura!");
      this.resetaJogo();
    } 

    if(this.sobeDesce == 200 && this.lado == 160){
      this.alertasService.showAlert("Ops! Cuidado com a tesoura!");
      this.resetaJogo();
    } 

    if(this.sobeDesce == 170 && this.lado == 180){
      this.alertasService.showAlert("Ops! Cuidado com a tesoura!");
      this.resetaJogo();
    } 

    if(this.sobeDesce == 30 && this.lado == 180){
      this.alertasService.showAlert("Ops! Cuidado com a tesoura!");
      this.resetaJogo();
    } 

    if(this.sobeDesce == 70 && this.lado == 220){
      this.alertasService.showAlert("Ops! Cuidado com a tesoura!");
      this.resetaJogo();
    } 
  }

  resetaJogo() {
    this.sobeDesce = 0;
    this.lado = 0;
  }

}
