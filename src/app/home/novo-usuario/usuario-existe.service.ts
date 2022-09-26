import { AbstractControl } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { Injectable } from '@angular/core';
import { first, map, switchMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {

  constructor(private novoUsuarioService: NovoUsuarioService) { }

  usuarioJaExiste() {
    return (control: AbstractControl) => {
      if (control.value == '')
        return new Observable<any>

      return control.valueChanges.pipe(
        switchMap((nomeUsuario) =>
          this.novoUsuarioService.verificarUsuarioExistente(nomeUsuario)
        ), map((usuarioExiste) =>
          (usuarioExiste ? { usuarioExistente: true } : null)
        ), first()
      )
    }
  }

}
