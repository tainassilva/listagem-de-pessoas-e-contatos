import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TablePessoasComponent } from './pages/table-pessoas/table-pessoas.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { FormsComponent } from './components/forms/forms.component';
import { AddPessoaComponent } from './pages/add-pessoa/add-pessoa.component';
import { EditPessoaComponent } from './pages/edit-pessoa/edit-pessoa.component';
import { HttpClientModule } from '@angular/common/http';
import { PessoasService } from './services/pessoas.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TablePessoasComponent,
    HomePageComponent,
    FormsComponent,
    AddPessoaComponent,
    EditPessoaComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PessoasService, FormsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
