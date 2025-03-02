import { Component, OnInit } from '@angular/core';
import { IPessoa } from 'src/app/interfaces/pessoa';
import { PessoasService } from 'src/app/services/pessoas.service';

@Component({
  selector: 'app-table-pessoas',
  templateUrl: './table-pessoas.component.html',
  styleUrls: ['./table-pessoas.component.scss']
})
export class TablePessoasComponent implements OnInit {

  pessoas: IPessoa[] = [];
  isLoading = true;

  constructor(private pessoasService: PessoasService) {}

  ngOnInit() {
    this.pessoasService.buscarTodasAsPessoas().subscribe({
      next: (response: IPessoa[]) => {
        this.pessoas = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erro ao buscar pessoas:", err);
        this.isLoading = false;
      }
    });
  }
}
