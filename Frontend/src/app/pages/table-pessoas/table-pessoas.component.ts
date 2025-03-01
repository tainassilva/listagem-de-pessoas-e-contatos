import { Component, inject, OnInit } from '@angular/core';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { PessoasService } from 'src/app/services/pessoas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-pessoas',
  templateUrl: './table-pessoas.component.html',
  styleUrls: ['./table-pessoas.component.scss']
})
export class TablePessoasComponent implements OnInit {
  pessoas: IPessoa[] = []
  isLoading = true;


  pessoasService = inject(PessoasService);

 // Função para retornar o celular de uma pessoa
 retornaApenasOCelular(pessoa: IPessoa): string | undefined {
  const celular = pessoa.contatos.find(contato => contato.tipoContato === 'CELULAR');
  return celular ? celular.contato : undefined;
}

  ngOnInit() {
    this.pessoasService.buscarTodasAsPessoas().subscribe({
      next: (response: IPessoa[]) => {
        this.pessoas = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erro ao buscar pessoas:", err);
        Swal.fire("Erro!", "Não foi possível buscar as pessoas.", "error");
        this.isLoading = false;
      }
    });
  }


  isDelete(id: number) {
    Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação é irreversível. Deseja realmente excluir este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.pessoasService.deletarPessoa(id).subscribe({
          next: () => {
            Swal.fire("Excluído!", "O registro foi removido com sucesso.", "success");
            this.pessoas = this.pessoas.filter(p => p.id !== id);
          },
          error: (err) => {
            console.error("Erro ao excluir pessoa:", err);
            Swal.fire("Erro!", "Não foi possível excluir o registro.", "error");
          }
        });
      }
    });
  }
}
