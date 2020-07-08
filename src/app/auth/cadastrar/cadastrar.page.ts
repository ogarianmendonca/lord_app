import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Perfil } from 'src/app/models/perfil';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingsService } from 'src/app/services/loadings.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss']
})
export class CadastrarPage implements OnInit {

  user: Usuario;
  perfis: Perfil[];
  formularioUsuario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private loadingsService: LoadingsService,
    private toastsService: ToastsService
  ) { }

  ngOnInit() {
    this.validaFormulario();
  }

  /**
    * Preenche e valida formulário
    */
  validaFormulario() {
    this.formularioUsuario = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      imagem: [''],
      password: ['', [Validators.required]],
      confimarSenha: ['', [Validators.required]]
    });
  }

  /**
   * Cadastrar usuário
   */
  cadastrarUsuario() {
    this.loadingsService.showLoading();

    if (this.formularioUsuario.value.password !== this.formularioUsuario.value.confimarSenha) {
      this.toastsService.showToastWarning('As senhas não conferem!');
      this.loadingsService.hideLoading();
      return false;
    }

    this.usuarioService.cadastrarUsuario(this.formularioUsuario.value).subscribe((resp: Usuario) => {
      this.toastsService.showToastSuccess('Usuário cadastrado com sucesso!');
      this.loadingsService.hideLoading();
      this.router.navigate(['auth/login']);
    }, (error) => {
      this.toastsService.showToastWarning(error.error[0]);
      this.loadingsService.hideLoading();
    })
  }

  /**
   * Encaminha para a tela de login
   */
  login() {
    this.router.navigate(['auth/login']);
  }

}
