import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PessoasService } from 'src/app/services/pessoas.service';
import { IPessoa } from 'src/app/interfaces/pessoa';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.scss'],
})
export class AddPessoaComponent{

  formGroupPessoa: FormGroup = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('[a-zA-ZÀ-ÿ ]*')
    ]),

    cep: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{5}-?[0-9]{3}$')  // Permitindo formatos 00000-000 ou 0000000
    ]),

    endereco: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern('[a-zA-ZÀ-ÿ0-9 ]*')
    ]),

    numeroCasa: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(6),
      Validators.pattern('^[0-9]+$')
    ]),

    cidade: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('[a-zA-ZÀ-ÿ ]*')
    ]),

    uf: new FormControl('', [Validators.required]),

    contatos: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{10,11}$')  // Permitindo 10 ou 11 dígitos para celular
    ]),
  });


  pessoasService = inject(PessoasService);
  router = inject(Router);

  salvarPessoa(): void {
    const pessoa: IPessoa = this.formGroupPessoa.value;
    pessoa.contatos = [this.formGroupPessoa.value.contatos[0]];
    this.pessoasService.cadastrarPessoa(pessoa).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Pessoa cadastrada com sucesso!', 'success');
        this.router.navigate(['/pessoas']);
      },
      error: (error) => {
        Swal.fire('Erro', 'Não foi possível cadastrar a pessoa.', 'error');
      },
    });
  }
}
