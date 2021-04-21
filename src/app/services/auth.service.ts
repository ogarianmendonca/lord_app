import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  atualizarPerfil = new EventEmitter<Usuario>();

  constructor(private http: HttpClient) { }

  /**
   * Função para login
   */
  logar(dados: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(environment.api_url + 'auth/login', dados)
      .pipe(tap(
        (resp: any) => {
          localStorage.setItem('token', resp.token);
        }));
  }

  /**
   * Função para verificar se o usuario está logado
   */
  verificaUsuarioLogado(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Função para logout
   */
  logout(): any {
    return this.http.get(environment.api_url + 'auth/logout');
  }

  /**
   *  Busca dados de usuario autenticado na base
   */
  getUsuarioAutenticado(): Observable<Usuario> {
    return this.http.get<Usuario>(environment.api_url + 'api/usuario/get-user')
      .pipe(tap(
        (resp: any) => {
          // Usar a linha abaixo quando a imagem for salva em um repositorio e não no banco de dados
          // resp['usuario']['imagem'] = environment.api_url + resp['usuario']['imagem'];
          localStorage.setItem('user', btoa(JSON.stringify(resp.usuario)));
          this.atualizarPerfil.emit(resp.usuario);
        }));
  }

  /**
   * Pega dados do usuario no storage
   */
  getUsuarioStorage(): Usuario {
    return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
  }

}
