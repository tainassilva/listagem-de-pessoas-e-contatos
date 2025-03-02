import { Component, inject, Input } from '@angular/core';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { PessoasService } from 'src/app/services/pessoas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-list-pessoas',
  templateUrl: './table-list-pessoas.component.html',
  styleUrls: ['./table-list-pessoas.component.scss']
})
export class TableListPessoasComponent {

  @Input()
  pessoas: IPessoa[] = [];

  pessoasService = inject(PessoasService);

  retornaApenasOCelular(pessoa: IPessoa): string | undefined {
    const celular = pessoa.contatos?.find(contato => contato.tipoContato === 'CELULAR');
    return celular ? celular.contato : undefined;
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
            Swal.fire("Erro!", "Não foi possível excluir o registro.", "error");
          }
        });
      }
    });
  }
}
