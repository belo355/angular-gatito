import { Router } from '@angular/router';
import { UsuarioExisteService } from './usuario-existe.service';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { usuarioSenhaIguaisValidators } from './usuario-senha-iguais.validators';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExisteService: UsuarioExisteService,
    private router: Router) { }

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      userName: [
        '',
        [Validators.required],
        [this.usuarioExisteService.usuarioJaExiste()],
      ],
      password: ['', [Validators.required]],
    },
      {
        validators: [usuarioSenhaIguaisValidators],
      }
    );
  }

  cadastrar() {
    if (this.novoUsuarioForm.valid) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(
        // next: () => this.router.navigate(['']),
        // error: () => console.log(Error),
        // complete: () => console.info('direcionando para tela de login')

        () => {
          this.router.navigate([''])
        },
        (error) => {
          console.log(error);
        }
     );
    }
  }
}
