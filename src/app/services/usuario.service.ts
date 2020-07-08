import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../models/perfil';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment';

/**
 * Usar em http.post
 */
const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlApiUsuario = environment.api_url + 'api/usuario/';

  constructor(private http: HttpClient) { }

  /**
   * Lista os tipos de perfis
   */
  listarPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(environment.api_url + 'api/perfil/buscarPerfis');
  }

  /**
   * Cadastra novo usuário
   */
  cadastrarUsuario(dados): Observable<Usuario> {
    return this.http.post<Usuario>(environment.api_url + 'auth/criar-usuario-mobile', dados, httpOptions);
  }

  /**
   * Faz upload da imagem
   */
  uploadImagem(arquivo) {
    const formData = new FormData();
    formData.append('imagem', arquivo[0]);
    return this.http.post(this.urlApiUsuario + 'upload', formData);
  }

  /**
   * Edita dados do usuário
   */
  editarUsuario(id, dados): Observable<Usuario> {
    return this.http.put<Usuario>(this.urlApiUsuario + 'editar/' + id, dados, httpOptions);
  }

}
