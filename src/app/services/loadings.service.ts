import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingsService {

  private carregando = false;

  constructor(private loadingController: LoadingController) { }

  /**
   * Mostra loading Carregando
   */
  async showLoading() {
    this.carregando = true;
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Carregando...'
    }).then(resp => {
      resp.present().then(() => {
        if (!this.carregando) {
          resp.dismiss();
        }
      });
    });
  }

  /**
   * Mostra loading Sair
   */
  async sairLoading() {
    this.carregando = true;
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Saindo...'
    }).then(resp => {
      resp.present().then(() => {
        if (!this.carregando) {
          resp.dismiss();
        }
      });
    });
  }

  /**
   * Fecha o loading
   */
  async hideLoading() {
    this.carregando = false;
    return await this.loadingController.getTop().then(resp => {
      if (resp) {
        resp.dismiss();
      }
    });
  }

}
