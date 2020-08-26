import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingsService } from 'src/app/services/loadings.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss']
})
export class PerfilPage implements OnInit {

  user: Usuario;
  imagem: Set<File>;
  formularioUsuario: FormGroup;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private loadingsService: LoadingsService,
    private toastsService: ToastsService
  ) { }

  ngOnInit() {
    this.buscarUsuarioLogado();
  }

  /**
   * Busca dados de usuario logado no storage
   */
  buscarUsuarioLogado() {
    this.loadingsService.showLoading();

    this.authService.getUsuarioAutenticado()
      .subscribe((resp: any) => {
        this.user = resp.usuario;
        this.validaFormulario(this.user);
        this.loadingsService.hideLoading();
      });
  }

  /**
   * Preenche e valida formulário
   */
  validaFormulario(user) {
    this.formularioUsuario = this.formBuilder.group({
      name: [user.name, [Validators.required]],
      email: [user.email, [Validators.required, Validators.email]],
      perfil_id: [user.perfil_id],
      status: [user.status],
      imagem: [''],
      password: [''],
      confimarSenha: ['']
    });
  }

  /**
   * Carrega imagem
   */
  carregarImagem(event: any) {
    this.imagem = event.target.files;
  }

  /**
   * Editar usuário logado
   */
  editarUsuario() {
    this.loadingsService.showLoading();

    if (this.formularioUsuario.value.password !== this.formularioUsuario.value.confimarSenha) {
      this.toastsService.showToastWarning('As senhas não conferem!');
      this.loadingsService.hideLoading();
      return false;
    }

    const id = this.user.id;

    if (!this.imagem) {
      this.usuarioService.editarUsuario(id, this.formularioUsuario.value).subscribe((resp: Usuario) => {
        this.toastsService.showToastSuccess('Perfil editado com sucesso!');
        this.loadingsService.hideLoading();
        this.buscarUsuarioLogado();
      }, (err) => {
        this.toastsService.showToastWarning('Erro ao editar perfil!');
        this.loadingsService.hideLoading();
      });
    } else {
      this.usuarioService.uploadImagem(this.imagem).subscribe((resImg: any) => {
        this.formularioUsuario.value.imagem = resImg.imagem;

        this.usuarioService.editarUsuario(id, this.formularioUsuario.value).subscribe((resp: Usuario) => {
          this.toastsService.showToastSuccess('Perfil editado com sucesso!');
          this.loadingsService.hideLoading();
          this.buscarUsuarioLogado();
        }, (err) => {
          this.toastsService.showToastWarning('Erro ao editar perfil!');
          this.loadingsService.hideLoading();
        });
      });
    }
  }
}
