import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablePessoasComponent } from './pages/table-pessoas/table-pessoas.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AddPessoaComponent } from './pages/add-pessoa/add-pessoa.component';
import { EditPessoaComponent } from './pages/edit-pessoa/edit-pessoa.component';

const routes: Routes = [
  {
    path: 'pessoas',
    component: TablePessoasComponent
  },
  {
    path:'pessoas/add',
    component: AddPessoaComponent
  },
  {
    path:'pessoas/edit/:id',
    component: EditPessoaComponent
  },
  {
    path: 'home', component: HomePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
