import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  constructor(private toastController: ToastController) { }

  /**
   * Mostra toastr warning com mensagem
   */
  async showToastWarning(mensagem: string) {
    const toast = await this.toastController.create({
      cssClass: 'my-custom-class',
      message: mensagem,
      duration: 2000,
      position: 'top',
      color: 'warning'
    });
    await toast.present();
  }

  /**
   * Mostra toastr success com mensagem
   */
  async showToastSuccess(mensagem: string) {
    const toast = await this.toastController.create({
      cssClass: 'my-custom-class',
      message: mensagem,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    await toast.present();
  }

}
