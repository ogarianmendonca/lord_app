import { ToastsService } from 'src/app/services/toasts.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingsService } from 'src/app/services/loadings.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss']
})
export class MenuPage implements OnInit {

  user: Usuario;

  constructor(
    private router: Router,
    private authService: AuthService, 
    private loadingsService: LoadingsService,
    private toastsService: ToastsService
  ) {}

  ngOnInit() {
    this.buscarUsuarioLogado();
    this.atualizaUsuarioLogado();
  }

  /**
   * Busca usuário logado
   */
  buscarUsuarioLogado() {
    this.loadingsService.showLoading();

    this.authService.getUsuarioAutenticado()
    .subscribe((resp: Usuario) => {
      this.user = resp['usuario'];
      this.loadingsService.hideLoading();
    }, (error: any) => {
      this.loadingsService.hideLoading();
      this.toastsService.showToastWarning("Não foi possível carregar a página!");
    });
  }

  /**
   * Atualiza dados do usuário logado quando o perfil for editado
   */
  atualizaUsuarioLogado() {
    this.authService.atualizarPerfil
    .subscribe((resp: Usuario) => {
      this.user = resp;
      if(this.user.status == false) {
        this.authService.logout();
      }
    });
  }

  /**
   * Fazer logout
   */
  logout(e) {
    this.loadingsService.sairLoading();
    e.preventDefault();
    this.authService.logout().subscribe(resp => {
      localStorage.clear();
      this.router.navigate(['auth/login']);
      this.loadingsService.hideLoading();
    });
  }

}
