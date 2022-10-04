import { TokenService } from './../autenticacao/token.service';
import { Animais, Animal } from './animais';
import { catchError, map, mapTo, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;
const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    return this.http.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
  }

  buscarPorId(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${API}/photos/${id}`);
  }

  excluirAnimal(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`${API}/photos/${id}`);
  }

  curtirAnimal(id: number): Observable<any> {
    return this.http.post(`${API}/photos/${id}/like`, {}, { observe: 'response' })
    .pipe(
      mapTo(true),
      catchError((error) => {
        return error.status === NOT_MODIFIED ? of(false) : throwError(() => new Error('test'));
      })
    )
  }

}
