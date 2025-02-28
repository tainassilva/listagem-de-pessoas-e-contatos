import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoasService } from 'src/app/services/pessoas.service';
import { IPessoa } from 'src/app/interfaces/pessoa';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pessoa',
  templateUrl: './edit-pessoa.component.html',
  styleUrls: ['./edit-pessoa.component.scss']
})
export class EditPessoaComponent implements OnInit {
  pessoa: IPessoa = {} as IPessoa;
  id: number = 0;

  formGroupPessoa: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    cep: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]),
    endereco: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
    numeroCasa: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5)]),
    cidade: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
    uf: new FormControl('', [Validators.required]),
    contatos: new FormControl([], [Validators.required, Validators.pattern('[0-9]{10,11}')]),
  });

  pessoasService = inject(PessoasService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.pessoasService.buscarPessoaPorId(this.id).subscribe({
        next: pessoa => {
          this.pessoa = pessoa;
          this.formGroupPessoa.patchValue({
            nome: pessoa.nome,
            cep: pessoa.cep,
            endereco: pessoa.endereco,
            numeroCasa: pessoa.numeroCasa,
            cidade: pessoa.cidade,
            uf: pessoa.uf,
            contatos: pessoa.contatos[0]
          });
        },
        error: error => {
          Swal.fire('Erro', 'Erro ao buscar pessoa!', 'error');
          this.router.navigate(['/pessoas']);
        }
      });
    }
  }

  atualizarPessoa(): void {
    if (this.pessoa) {

      const pessoa: IPessoa = this.formGroupPessoa.value;
      pessoa.contatos = [this.formGroupPessoa.value.contatos[0]];

      Swal.fire({
        title: "Deseja salvar as alterações?",
        text: "Você pode cancelar ou continuar sem salvar.",
        icon: "question",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Salvar",
        denyButtonText: "Não salvar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        denyButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
      }).then((result) => {
        if (result.isConfirmed) {
          this.pessoasService.atualizarPessoa(this.id, pessoa).subscribe({
            next: () => {
              Swal.fire('Sucesso', 'Pessoa editada com sucesso!', 'success');
              this.router.navigate(['/pessoas']);
            },
            error: error => {
              console.error("Erro ao atualizar pessoa", error);
              Swal.fire('Erro', 'Erro ao atualizar pessoa!', 'error');
            }
          });
        }
        });
    }
}
}
