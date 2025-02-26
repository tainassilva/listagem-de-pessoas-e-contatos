import { Component, OnInit } from '@angular/core';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { PessoasService } from 'src/app/services/pessoas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-pessoas',
  templateUrl: './table-pessoas.component.html',
  styleUrls: ['./table-pessoas.component.scss']
})
export class TablePessoasComponent implements OnInit {

  pessoas: IPessoa[] = [];

  constructor(private pessoasService: PessoasService) {}

  ngOnInit() {
    this.pessoasService.buscarTodasAsPessoas().subscribe({
      next: (response: IPessoa[]) => {
        console.log('Pessoas recebidas:', response); // Adiciona um log aqui
        this.pessoas = response;
      },
      error: (err) => {
        console.error("Erro ao buscar pessoas:", err);
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
        this.pessoasService.deletarPessoa(id).subscribe(() => {
          Swal.fire("Excluído!", "O registro foi removido com sucesso.", "success");
          this.pessoas = this.pessoas.filter(p => p.id !== id);
        }, () => {
          Swal.fire("Erro!", "Não foi possível excluir o registro.", "error");
        });
      }
    });
  }
}
