import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCursoComponent } from './components/add-curso/add-curso.component';
import { EditCursoComponent } from './components/edit-curso/edit-curso.component';
import { DeleteCursoComponent } from './components/delete-curso/delete-curso.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListCursoComponent } from './components/list-curso/list-curso.component';
import { AddAlunoComponent } from './components/add-aluno/add-aluno.component';
import { EditAlunoComponent } from './components/edit-aluno/edit-aluno.component';
import { DeleteAlunoComponent } from './components/delete-aluno/delete-aluno.component';
import { ListAlunoComponent } from './components/list-aluno/list-aluno.component';
import { AddMatriculaComponent } from './components/add-matricula/add-matricula.component';
import { ListMatriculaComponent } from './components/list-matricula/list-matricula.component';
import {
  ReactiveFormsModule
} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddCursoComponent,
    EditCursoComponent,
    DeleteCursoComponent,
    ListCursoComponent,
    AddAlunoComponent,
    EditAlunoComponent,
    DeleteAlunoComponent,
    ListAlunoComponent,
    AddMatriculaComponent,
    ListMatriculaComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
